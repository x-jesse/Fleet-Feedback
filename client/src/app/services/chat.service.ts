import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {
  private backendUrl = "http://localhost:3000"; // Your local backend server

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMessage()
  }

  initMessage(): Observable<any> {

    const payload = { 
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "tell a joke" }
        // { role: "user", content: "Give me a report of the most recent trip" }
      ],
      max_tokens: 800,
      presence_penalty: 0.0,
      frequency_penalty: 0.0    
    };

    return this.http.post(`${this.backendUrl}/api/chat`, payload);
  }
}