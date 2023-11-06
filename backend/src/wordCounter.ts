import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import Vocabulary from 'vocabulary.ts'

export async function wordCounter(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Parse the input data from the request body
    const requestBody = JSON.parse(event.body || "")

    // Tokenize the input text and count word types
    const text = requestBody.text as string
    const words = text.split(' ') // Better to use text.split(/[\s\d\.,;:"'\(\)]+/)
    const wordTypes: Record<string, number> = {}

    words.forEach((word) => {
      for (const type in Vocabulary) {
        if (Vocabulary[type].includes(word)) {
          wordTypes[type] = (wordTypes[type] || 0) + 1;
          break;
        }
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(wordTypes),
    }
  } catch (error) {
    // Handle errors and return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    }
  }
}
