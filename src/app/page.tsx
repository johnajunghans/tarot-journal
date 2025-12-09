/**
 * Root Page
 * 
 * Redirects to the journal dashboard as the default landing page.
 */
import { redirect } from "next/navigation"

export default function Home() {
  redirect("/journal")
}
