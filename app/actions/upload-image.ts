"use server"

import { put } from "@vercel/blob"

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      throw new Error("No file provided")
    }

    const blob = await put(file.name, file, {
      access: "public",
    })

    return { success: true, url: blob.url }
  } catch (error: any) {
    console.error("[v0] Server-side upload error:", error)
    return { success: false, error: error.message }
  }
}
