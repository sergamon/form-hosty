'use server';
/**
 * @fileOverview An ID data extraction AI agent.
 *
 * - extractDataFromID - A function that handles the data extraction process from an ID document.
 * - ExtractDataFromIDInput - The input type for the extractDataFromID function.
 * - ExtractDataFromIDOutput - The return type for the extractDataFromID function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExtractDataFromIDInputSchema = z.object({
  frontPhotoDataUri: z
    .string()
    .describe(
      "The front photo of an ID document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  backPhotoDataUri: z
    .string()
    .optional()
    .describe(
      "The back photo of an ID document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractDataFromIDInput = z.infer<typeof ExtractDataFromIDInputSchema>;

const ExtractDataFromIDOutputSchema = z.object({
  full_name: z.string().optional().describe('The full name extracted from the ID.'),
  document_type: z.string().optional().describe('The document type extracted from the ID.'),
  identification_number: z.string().optional().describe('The identification number extracted from the ID.'),
  birthdate_ddmmyyyy: z.string().optional().describe('The birthdate extracted from the ID in dd/mm/yyyy format.'),
  nationality_label: z.string().optional().describe('The nationality label extracted from the ID.'),
  ocr_raw_json: z.string().optional().describe('The raw JSON output from the OCR process.'),
  ocr_confidence_json: z.string().optional().describe('The confidence scores from the OCR process as JSON.'),
});
export type ExtractDataFromIDOutput = z.infer<typeof ExtractDataFromIDOutputSchema>;

export async function extractDataFromID(input: ExtractDataFromIDInput): Promise<ExtractDataFromIDOutput> {
  return extractDataFromIDFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractDataFromIDPrompt',
  input: { schema: ExtractDataFromIDInputSchema },
  output: { schema: ExtractDataFromIDOutputSchema },
  prompt: `You are a highly capable OCR extraction agent. Your task is to extract identity information from images of ID cards or passports.
  
  EXTRACT THE FOLLOWING FIELDS:
  - full_name: The complete name of the person.
  - document_type: The exact type of document (e.g., Cédula de Ciudadanía, Pasaporte, ID Card).
  - identification_number: The unique number of the document. Remove any spaces or symbols.
  - birthdate_ddmmyyyy: The date of birth in DD/MM/YYYY format.
  - nationality_label: The country of nationality (e.g., COLOMBIA). If not present, infer from the document issuer.
  
  INSTRUCTIONS:
  1. Analyze both the Front and Back photos if provided.
  2. If a field is illegible or missing, leave it as null or empty string.
  3. Respond STRICTLY in JSON.
  
  Front Photo: {{media url=frontPhotoDataUri}}
  {{#if backPhotoDataUri}}
  Back Photo: {{media url=backPhotoDataUri}}
  {{/if}}
  `,
});

const extractDataFromIDFlow = ai.defineFlow(
  {
    name: 'extractDataFromIDFlow',
    inputSchema: ExtractDataFromIDInputSchema,
    outputSchema: ExtractDataFromIDOutputSchema,
  },
  async (input: any) => {
    console.log('--- START EXTRACTION FLOW ---');
    try {
      if (!input.frontPhotoDataUri) {
        throw new Error('Missing front photo data URI');
      }

      console.log('Sending request to Gemini...');
      const { output } = await prompt(input);

      if (!output) {
        console.error('Gemini returned empty output');
        throw new Error('AI returned no data');
      }

      console.log('Extraction completed successfully');
      return output;
    } catch (error: any) {
      console.error('--- EXTRACTION FLOW FAILED ---');
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      if (error.stack) console.error('Stack trace:', error.stack);

      // Re-throw a user-friendly error
      throw new Error(`AI Extraction Error: ${error.message || 'Unknown error'}`);
    }
  }
);
