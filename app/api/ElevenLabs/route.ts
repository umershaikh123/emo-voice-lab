// ./app/api/chat/route.ts
 

// Create an OpenAI API client (that's edge friendly!)
 
  // apiKey: process.env.ELEVENLABS_API_KEY
 
 

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
 
}
