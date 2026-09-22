'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import SlideDeck from '../../components/SlideDeck'

export default function DisplayScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [pollActive, setPollActive] = useState(false)
  const [revealResults, setRevealResults] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({ A: 0, B: 0, C: 0, D: 0 })
  const [rawResponses, setRawResponses] = useState<any[]>([])
  const [totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    async function fetchState() {
      const { data } = await supabase
        .from('presentation_state')
        .select('*')
        .eq('id', 1)
        .single()

      if (data) {
        setCurrentSlide(data.current_slide ?? 0)
        setCurrentStep(data.step ?? 0)
        setPollActive(data.poll_active ?? false)
        setRevealResults(data.reveal_results ?? false)
        setSelectedStudent(data.selected_student ?? null)
      }
    }

    fetchState()

    const channel = supabase
      .channel('presentation_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'presentation_state' },
        (payload: any) => {
          if (payload.new) {
            setCurrentSlide(payload.new.current_slide ?? 0)
            setCurrentStep(payload.new.step ?? 0)
            setPollActive(payload.new.poll_active ?? false)
            setRevealResults(payload.new.reveal_results ?? false)
            setSelectedStudent(payload.new.selected_student ?? null)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    async function fetchVotes() {
      const { data } = await supabase
        .from('responses')
        .select('chosen_option, student_id')
        .eq('slide_index', currentSlide)

      if (data) {
        setRawResponses(data)
        setTotalVotes(data.length)

        const counts: { [key: string]: number } = { A: 0, B: 0, C: 0, D: 0 }
        data.forEach((row: any) => {
          if (counts[row.chosen_option] !== undefined) {
            counts[row.chosen_option]++
          }
        })
        setVoteCounts(counts)
      }
    }

    fetchVotes()

    const responsesChannel = supabase
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
      supabase.removeChannel(responsesChannel)
    }
  }, [currentSlide])

  return (
    <main className="h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 md:p-6 font-sans select-none overflow-hidden">
      {/* Top Header Bar (Compact) */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-3 shrink-0">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">Pre-Service Teachers Development Seminar</h1>
          <p className="text-xs text-slate-600">William Angelo V. Gonzales</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-center shadow-sm">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Slide / Step</p>
            <p className="text-base font-black text-blue-600">{currentSlide} <span className="text-xs text-slate-500">({currentStep})</span></p>
          </div>
          <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-center shadow-sm">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Poll Status</p>
            <p className={`text-base font-bold ${pollActive ? 'text-emerald-600' : 'text-slate-400'}`}>
              {pollActive ? 'OPEN' : 'CLOSED'}
            </p>
          </div>
          <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-center shadow-sm">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total Responses</p>
            <p className="text-base font-black text-slate-900">{totalVotes}</p>
          </div>
        </div>
      </div>

      {/* Center Slide / Results Area (Expanded) */}
      <div className="flex-1 min-h-0 py-4 max-w-7xl mx-auto w-full flex flex-col items-center justify-center overflow-hidden">
        {!revealResults ? (
          <SlideDeck slideIndex={currentSlide} step={currentStep} />
        ) : (
          <div className="space-y-6 w-full max-h-full overflow-y-auto">
            <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-6">
              Live Results — Slide {currentSlide}
            </h2>

            {currentSlide > 4 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md max-h-[500px] overflow-y-auto space-y-3">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  All Student Responses ({totalVotes})
                </p>
                {rawResponses.length === 0 ? (
                  <p className="text-slate-500 text-center py-6">No responses submitted yet for this slide.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Array.from(
                      rawResponses.reduce((acc: Map<string, number>, curr: any) => {
                        const ans = curr.chosen_option
                        acc.set(ans, (acc.get(ans) || 0) + 1)
                        return acc
                      }, new Map<string, number>())
                    ).map(([answer, count], idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">{answer}</span>
                        <span className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full border border-slate-300 font-medium">
                          {count} {count === 1 ? 'student' : 'students'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['A', 'B', 'C', 'D'].map((opt) => {
                  const count = voteCounts[opt] || 0
                  const pct = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100)
                  return (
                    <div key={opt} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-2xl font-bold text-slate-800">Option {opt}</span>
                        <span className="text-xl font-black text-blue-600">{count} votes ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Center Modal for Selected Student */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md animate-fadeIn p-4">
          <div className="bg-white border-2 border-amber-400 rounded-3xl p-10 max-w-xl w-full text-center shadow-2xl relative space-y-6 transform scale-100 transition-all">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-400 text-amber-950 px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider shadow-md flex items-center space-x-2">
              <span>🎯</span>
              <span>Selected Participant</span>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedStudent.name}</h2>
              <p className="text-lg font-semibold text-amber-700">{selectedStudent.program}</p>
              <p className="text-sm text-slate-500 font-mono">ID: {selectedStudent.student_id}</p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-sm">
              💡 Please defend your answer or share your perspective on the current slide topic!
            </div>

            <button
              onClick={() => {
                setSelectedStudent(null)
              }}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition border border-slate-300"
            >
              Dismiss ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer (Compact) */}
      <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-200 shrink-0">
        Pre-Service Teachers Development Seminar • Real-Time Classroom Response System
      </div>
    </main>
  )
}