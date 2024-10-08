import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../components/chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private backendUrl = "http://localhost:3000"; // Your local backend server

  constructor(private http: HttpClient) {}

  initMessage(incidents: any[]): Observable<any> {
    const payload = { 
      messages: [
        { role: "system", content: "Act as a driving coach with knowledge about the user's history and known faults. For each fault, provide a brief explanation of why the rule is important using statistics to back up your reasoning, and concise steps the driver can take to correct their behaviour. Keep your responses short and to the point." },
        ...incidents.map(incident => ({ role: 'system', content: `Here are the incident/fault details from the user's most recent trip: ${incident.incidentType}` })),
        { role: "user", content: "Give me a summarized report of this trip based on the provided incident details, separating each incident report with a newline character. Do not start the report with casual speak, and begin immediately with the first incident" }
      ],
      max_tokens: 800,
      presence_penalty: 0.0,
      frequency_penalty: 0.0    
    };

    return this.http.post(`${this.backendUrl}/api/chat`, payload);
  }

  sendMessage(messages: Message[]): Observable<any> {
    const payload = { 
      messages: messages, // Send the entire messages array
      max_tokens: 800,
      presence_penalty: 0.0,
      frequency_penalty: 0.0    
    };

    return this.http.post(`${this.backendUrl}/api/chat`, payload);
  }
}
