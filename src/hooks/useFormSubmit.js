import { useState } from "react"

export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (reqFn) => {
    setIsSubmitting(true)
    setError("")

    try {
      const result = await reqFn()
      return result
    } catch (err) {
      console.error("Form submission error:", err)
      setError(err?.response?.data?.detail || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit, isSubmitting, error }
}
