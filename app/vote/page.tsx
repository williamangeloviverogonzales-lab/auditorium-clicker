'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function StudentVotePage() {
  const [studentIdInput, setStudentIdInput] = useState('')
  const [student, setStudent] = useState<any>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [pollActive, setPollActive] = useState(false)
  const [selectedVote, setSelectedVote] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Listen to presentation state changes in real time
  useEffect(() => {
    fetchPresentationState()

    const channel = supabase
      .channel('public:presentation_state')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'presentation_state' },
        (payload: any) => {
          if (payload.new) {
            setCurrentSlide(payload.new.current_slide)
            setPollActive(payload.new.poll_active)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Check existing vote whenever the student changes slides or logs in
  useEffect(() => {
    if (student) {
      checkExistingVote()
    }
  }, [currentSlide, student])

  const fetchPresentationState = async () => {
    const { data } = await supabase
      .from('presentation_state')
      .select('*')
      .eq('id', 1)
      .single()

    if (data) {
      setCurrentSlide(data.current_slide)
      setPollActive(data.poll_active)
    }
  }

  const checkExistingVote = async () => {
    if (!student) return
    const { data } = await supabase
      .from('responses')
      .select('chosen_option')
      .eq('student_id', student.student_id)
      .eq('slide_index', currentSlide)
      .maybeSingle()

    if (data) {
      setSelectedVote(data.chosen_option)
      setHasVoted(true)
    } else {
      setSelectedVote(null)
      setHasVoted(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    const trimmedId = studentIdInput.trim()

    if (!trimmedId) {
      setErrorMsg('Please enter your Student ID.')
      return
    }

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('student_id', trimmedId)
      .maybeSingle()

    if (error || !data) {
      setErrorMsg('Student ID not found in the roster. Please check with your organizer.')
      return
    }

    setStudent(data)
  }

  const handleVote = async (option: string) => {
    if (!pollActive || !student) return
    setSelectedVote(option)
    setSubmitting(true)

    // Upsert vote (inserts or updates if student already voted on this slide)
    const { error } = await supabase
      .from('responses')
      .upsert(
        {
          student_id: student.student_id,
          slide_index: currentSlide,
          chosen_option: option,
        },
        { onConflict: 'student_id,slide_index' }
      )

    if (!error) {
      setHasVoted(true)
    }
    setSubmitting(false)
  }

  // Login Screen if student hasn't entered their ID yet
  if (!student) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Pre-Service Teachers Development Seminar Clicker</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your Student ID to join the live session.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                placeholder="e.g., 2026-001"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              />
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-sm"
            >
              Enter Session
            </button>
          </form>
        </div>
      </main>
    )
  }

  // Voting Screen once logged in
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Logged in as</p>
            <p className="font-bold text-gray-800">{student.name}</p>
          </div>
          <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 font-medium rounded-full">
            {student.program}
          </span>
        </div>
      </div>

      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Current Slide</p>
          <p className="text-4xl font-extrabold text-blue-600 mt-1">{currentSlide}</p>
        </div>

        {!pollActive ? (
          <div className="py-8 px-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-lg font-medium text-gray-600">Waiting for poll to open...</p>
            <p className="text-xs text-gray-400 mt-1">Options will appear automatically when the presenter starts voting.</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-green-600 mb-4 tracking-wide uppercase">🟢 Poll is Open! Cast your vote:</p>

            {/* Check if current slide is short answer (Slides 4-22) or multiple choice (Slides 0-3) */}
            {currentSlide > 3 ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const textAnswer = (e.currentTarget.elements.namedItem('shortAnswer') as HTMLInputElement)?.value.trim()
                  if (!textAnswer) return
                  await handleVote(textAnswer)
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="shortAnswer"
                  defaultValue={selectedVote || ''}
                  placeholder="Type your answer here..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 text-lg"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-sm"
                >
                  Submit Answer ➔
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {['A', 'B', 'C', 'D'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleVote(opt)}
                    disabled={submitting}
                    className={`py-6 text-2xl font-bold rounded-2xl border-2 transition shadow-sm ${
                      selectedVote === opt
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-200 hover:border-blue-400 text-gray-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {hasVoted && (
              <p className="text-sm text-green-600 font-medium mt-4">✓ Your response has been recorded!</p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}