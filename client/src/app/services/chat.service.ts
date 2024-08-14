import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {
  private backendUrl = "http://localhost:3000"; // Your local backend server

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchGenToken();
  }

  // Method to fetch gen_token from your custom backend
  private fetchGenToken(): void {
    this.http.get<{ token: string }>(`${this.backendUrl}/api/get-genai-api`)
      .pipe(
        tap(response => {
          localStorage.setItem('GEN_AI', response.token); // Storing the token in local storage
        })
      )
      .subscribe();
  }

  initMessage(): Observable<any> {
    const token = localStorage.getItem('GEN_AI'); // Fetching the token from local storage

    const payload = { 
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "Give me a report of the most recent trip" }
      ],
      max_tokens: 800,
      presence_penalty: 0.0,
      frequency_penalty: 0.0    
    };

    const headers = {
      'Content-Type': 'application/json',
      'api-key': `${token}`
    };

    return this.http.post(`${this.backendUrl}/chat`, payload, { headers });
  }
}