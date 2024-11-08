"use server";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import axios from "axios";
import { createStreamableValue } from "ai/rsc";

export async function generateEmail(context: string, prompt: string) {
  const stream = createStreamableValue("");

  const apiKey = process.env.OPENAI_API_KEY; // Make sure to load your API key from environment variables

  // try {
  //     const { textStream } = await streamText({
  //         model: openai("gpt-4o-mini"),
  //         prompt: `
  //         YOU ARE AN AI ASSISTANT THAT HELPS COMPOSE EMAILS.

  //         THE TIME AND DATE IS ${new Date().toLocaleString()}.

  //         START OF CONTEXT BLOCK
  //         ${context}
  //         END OF CONTEXT BLOCK

  //         USER PROMPT:
  //         ${prompt}

  //         When Responding, keep in mind the following points:
  //         1. Be helpful, clever and architect
  //         2. Rely on the provided context and user prompt to compose the email
  //         3. The email should be clear and easy to understand
  //         4. The email should be helpful and provide value to the user
  //         5. The email should be well structured and easy to read
  //         6. The email should be concise and to the point
  //         7. The email should be engaging and interesting
  //         8. Do not answer questions that are not related to the email
  //         9. Do not engage with any questions that are not related to the email
  //         `,
  //     });

  //     for await (const chunk of textStream) {
  //         console.log('Received chunk:', chunk);
  //         stream.update(chunk);
  //     }
  //     stream.done();
  // } catch (error) {
  //     console.error('Error generating email:', error);
  // }
  

  try {
    const response = await axios.post(
      "https://jamsapi.hackclub.dev/openai/chat/completions",
      {
        model: "gpt-4o-mini", // Specify the model you want to use
        messages: [
          {
            role: "user",
            content: `
            YOU ARE AN AI ASSISTANT THAT HELPS COMPOSE EMAILS.

            THE TIME AND DATE IS ${new Date().toLocaleString()}.

            START OF CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK

            USER PROMPT:
            ${prompt}

            When Responding, keep in mind the following points:
            1. Be helpful, clever and architect
            2. Rely on the provided context and user prompt to compose the email
            3. The email should be clear and easy to understand 
            4. The email should be helpful and provide value to the user
            5. The email should be well structured and easy to read
            6. The email should be concise and to the point
            7. The email should be engaging and interesting
            8. Do not answer questions that are not related to the email
            9. Do not engage with any questions that are not related to the email
                    `,
          },
        ],
        max_tokens: 9999, // Adjust as necessary for your use case
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );


    const generatedText = response.data.choices[0].message.content; // Access generated text from response
    stream.update(generatedText); // Update stream with generated text
    stream.done(); // Mark stream as complete
  } catch (error) {
    console.error("Error generating email:", error);
  }

  return { output: stream.value };
}


export async function generateEmailStream(text: string) {
  const stream = createStreamableValue("");

  const apiKey = process.env.OPENAI_API_KEY; // Make sure to load your API key from environment variables

  // (async () => {
  //   const {textStream} = await streamText({
  //     model: openai("gpt-4o-mini"),
  //     prompt: `
  //     ALWAYS RESPOND IN PLAIN TEXT, no html or markdown.
  //     You are a helpful AI embedded in a email client app that is used to autocomplete sentences, similar to gmail 
  //     The traits of AI include expert knowledge, helpfulqess, cleverness, and articulateness .
  //     AI is a well-behaved and well-mannered individual.
  //     similar to google g
  //     AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the us
  //     I am writing a piece ofltext in a notion text editor app.
  //     Help me complete my train of thought here:
  //     keep the tone of the text consistent with the rest of the text .
  //     keep the response short and sweet. Act like a copilot, finish my sentence if need be, but don't tru to generatel
  //     Do not add fluff like "I'm here to help you" or "I'm a helpful AI" or anything like that.
  //     Example :
      
  //     Dear Alice, I'm sorry to hear that you are feeling down.

  //     Output: Unfortunately, I can't help you with that .
      
  //     Your output is directly concatenated to the input, so do not add any new lines or formatting, just plain text.
  //     `
  //   })

  //   for await (const chunk of textStream) {
  //     stream.update(chunk);
  //   }
  //   stream.done();
  // })();

  try {
    const response = await axios.post(
      "https://jamsapi.hackclub.dev/openai/chat/completions",
      {
        model: "gpt-4o-mini", // Specify the model you want to use
        messages: [
          {
            role: "user",
            content: `
            ALWAYS RESPOND IN PLAIN TEXT, no html or markdown.
            You are a helpful AI embedded in a email client app that is used to autocomplete sentences, similar to gmail 
            The traits of AI include expert knowledge, helpfulqess, cleverness, and articulateness .
            AI is a well-behaved and well-mannered individual.
            similar to google g
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the us
            I am writing a piece ofltext in a notion text editor app.
            Help me complete my train of thought here:
            keep the tone of the text consistent with the rest of the text .
            keep the response short and sweet. Act like a copilot, finish my sentence if need be, but don't tru to generatel
            Do not add fluff like "I'm here to help you" or "I'm a helpful AI" or anything like that.
            Example :
            
            Dear Alice, I'm sorry to hear that you are feeling down.

            Output: Unfortunately, I can't help you with that .
            
            Your output is directly concatenated to the input, so do not add any new lines or formatting, just plain text.
      `,
          },
        ],
        max_tokens: 9999, // Adjust as necessary for your use case
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );


    const generatedText = response.data.choices[0].message.content; // Access generated text from response
    stream.update(generatedText); // Update stream with generated text
    stream.done(); // Mark stream as complete
  } catch (error) {
    console.error("Error generating email:", error);
  }

  return { output: stream.value };
}
