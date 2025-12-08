/**
 * Root Page
 * 
 * Redirects to the readings page as the default landing page.
 */
import { redirect } from "next/navigation"

export default function Home() {
  redirect("/readings")
}
