'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function ControllerDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [pollActive, setPollActive] = useState(false)
  const [revealResults, setRevealResults] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({ A: 0, B: 0, C: 0, D: 0 })
  const [totalVotes, setTotalVotes] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  // Fetch initial state and subscribe to real-time changes
  useEffect(() => {
    fetchState()

    const channel = supabase
      .channel('presentation_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'presentation_state' },
        (payload: any) => {
          if (payload.new) {
            setCurrentSlide(payload.new.current_slide)
            setPollActive(payload.new.poll_active)
            setRevealResults(payload.new.reveal_results)
            setSelectedStudent(payload.new.selected_student)
            setCurrentStep(payload.new.step ?? 0) // 👈 Track step changes in realtime
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Fetch live votes whenever slide or poll status changes
  useEffect(() => {
    fetchVotes()

    const votesChannel = supabase
      .channel('responses_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'responses' },
        () => {
          fetchVotes()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(votesChannel)
    }
  }, [currentSlide])

  const fetchState = async () => {
    const { data, error } = await supabase
      .from('presentation_state')
      .select('*')
      .eq('id', 1)
      .single()

    if (data) {
      setCurrentSlide(data.current_slide)
      setPollActive(data.poll_active)
      setRevealResults(data.reveal_results)
      setSelectedStudent(data.selected_student)
      setCurrentStep(data.step ?? 0) // 👈 Set initial step
    }
  }

  const fetchVotes = async () => {
    const { data, error } = await supabase
      .from('responses')
      .select('chosen_option')
      .eq('slide_index', currentSlide)

    if (data) {
      const counts: { [key: string]: number } = { A: 0, B: 0, C: 0, D: 0 }
      data.forEach((row: any) => {
        if (counts[row.chosen_option] !== undefined) {
          counts[row.chosen_option]++
        }
      })
      setVoteCounts(counts)
      setTotalVotes(data.length)
    }
  }

  // Update presentation state in Supabase
  const updateState = async (updates: any) => {
    await supabase
      .from('presentation_state')
      .update(updates)
      .eq('id', 1)
  }

  const handleNextSlide = async () => {
    const newSlide = currentSlide + 1
    setCurrentSlide(newSlide)
    setCurrentStep(0)
    await supabase
      .from('presentation_state')
      .update({ current_slide: newSlide, step: 0 })
      .eq('id', 1)
  }

  const handlePrevSlide = async () => {
    const newSlide = Math.max(0, currentSlide - 1)
    setCurrentSlide(newSlide)
    setCurrentStep(0)
    await supabase
      .from('presentation_state')
      .update({ current_slide: newSlide, step: 0 })
      .eq('id', 1)
  }

  const togglePoll = () => {
    updateState({ poll_active: !pollActive })
  }

  const toggleReveal = () => {
    updateState({ reveal_results: !revealResults })
  }

  const pickRandomStudent = async () => {
    const { data, error } = await supabase.from('students').select('*')
    if (data && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)]
      setSelectedStudent(random)
      updateState({ selected_student: random })
    } else {
      alert('No students found in database yet!')
    }
  }

  const handleNextStep = async () => {
    const newStep = currentStep + 1
    setCurrentStep(newStep)
    await supabase.from('presentation_state').update({ step: newStep }).eq('id', 1)
  }

  const handlePrevStep = async () => {
    const newStep = Math.max(0, currentStep - 1)
    setCurrentStep(newStep)
    await supabase.from('presentation_state').update({ step: newStep }).eq('id', 1)
  }

  const pickRandomRespondent = async () => {
    // 1. Get unique student IDs who responded to the current slide
    const { data: responsesData, error: respError } = await supabase
      .from('responses')
      .select('student_id')
      .eq('slide_index', currentSlide)

    if (respError || !responsesData || responsesData.length === 0) {
      alert(`No student responses found for Slide ${currentSlide} yet!`)
      return
    }

    // Extract unique student IDs
    const respondentIds = Array.from(new Set(responsesData.map((r: any) => r.student_id)))

    // 2. Fetch student details for those IDs from the 'students' table
    const { data: studentsData, error: studError } = await supabase
      .from('students')
      .select('*')
      .in('student_id', respondentIds)

    if (studError || !studentsData || studentsData.length === 0) {
      alert('Could not match respondent IDs with the students table.')
      return
    }

    // 3. Pick one at random
    const randomStudent = studentsData[Math.floor(Math.random() * studentsData.length)]
    setSelectedStudent(randomStudent)
    updateState({ selected_student: randomStudent })
  }

  return (
    <main className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Presentation Controller</h1>

      {/* Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-blue-600 font-medium">Current Slide / Step</p>
          <p className="text-2xl font-bold text-blue-900">{currentSlide} <span className="text-sm font-normal text-blue-700">(Step {currentStep})</span></p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 font-medium">Poll Status</p>
          <p className={`text-2xl font-bold ${pollActive ? 'text-green-600' : 'text-gray-500'}`}>
            {pollActive ? 'OPEN' : 'CLOSED'}
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600 font-medium">Total Votes</p>
          <p className="text-2xl font-bold text-gray-900">{totalVotes}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-purple-600 font-medium">Results Revealed</p>
          <p className={`text-2xl font-bold ${revealResults ? 'text-purple-600' : 'text-gray-500'}`}>
            {revealResults ? 'YES' : 'NO'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Slide & Poll Actions</h2>
        
        {/* Row 1: Slides */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handlePrevSlide}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-gray-700 transition text-center"
          >
            ← Previous Slide
          </button>
          <button
            onClick={handleNextSlide}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 font-medium text-white rounded-lg transition text-center shadow-sm"
          >
            Next Slide →
          </button>
        </div>

        {/* Row 2: Steps */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handlePrevStep}
            className="px-4 py-3 bg-amber-100 hover:bg-amber-200 font-medium rounded-lg text-amber-800 transition text-center"
          >
            ◀ Prev Step
          </button>
          <button
            onClick={handleNextStep}
            className="px-4 py-3 bg-amber-600 hover:bg-amber-700 font-medium text-white rounded-lg transition text-center shadow-sm"
          >
            Reveal Next Step ▶
          </button>
        </div>

        {/* Row 3: Poll & Results */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={togglePoll}
            className={`px-4 py-3 font-medium text-white rounded-lg transition text-center shadow-sm ${
              pollActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {pollActive ? 'Close Poll' : 'Open Poll'}
          </button>
          <button
            onClick={toggleReveal}
            className="px-4 py-3 bg-purple-600 hover:bg-purple-700 font-medium text-white rounded-lg transition text-center shadow-sm"
          >
            {revealResults ? 'Hide Results' : 'Reveal Results'}
          </button>
        </div>
      </div>

      {/* Live Vote Breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Live Vote Counts (Slide {currentSlide})</h2>
          <button
            onClick={async () => {
              if (confirm(`Are you sure you want to clear all votes for Slide ${currentSlide}?`)) {
                const { error } = await supabase
                  .from('responses')
                  .delete()
                  .eq('slide_index', currentSlide)

                if (error) {
                  alert('Error clearing votes: ' + error.message)
                } else {
                  fetchVotes()
                }
              }
            }}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm font-medium rounded-lg transition"
          >
            🗑️ Clear Votes for Slide {currentSlide}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['A', 'B', 'C', 'D'].map((opt) => (
            <div key={opt} className="border border-gray-100 bg-gray-50 p-4 rounded-lg text-center">
              <span className="text-lg font-bold text-gray-700">Option {opt}</span>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">{voteCounts[opt] || 0}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Random Student Selector */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-amber-900 mb-2">Random Student Selector</h2>
        <p className="text-sm text-amber-700 mb-4">Pick a random participant to defend their answer.</p>
        
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={pickRandomStudent}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 font-medium text-white rounded-lg transition shadow-sm"
          >
            🎲 Pick Any Student
          </button>

          <button
            onClick={pickRandomRespondent}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 font-medium text-white rounded-lg transition shadow-sm"
          >
            🎯 Pick From Slide {currentSlide} Respondents ({totalVotes} votes)
          </button>

          {selectedStudent && (
            <button
              onClick={() => {
                setSelectedStudent(null)
                updateState({ selected_student: null })
              }}
              className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 font-medium text-gray-700 rounded-lg transition shadow-sm"
            >
              Clear Selected ✕
            </button>
          )}
        </div>

        {selectedStudent && (
          <div className="mt-4 p-4 bg-white border border-amber-300 rounded-lg shadow-inner">
            <p className="text-sm text-gray-500">Selected Participant:</p>
            <p className="text-xl font-bold text-gray-900">{selectedStudent.name}</p>
            <p className="text-sm text-gray-600">{selectedStudent.program} • ID: {selectedStudent.student_id}</p>
          </div>
        )}
      </div>
    </main>
  )
}