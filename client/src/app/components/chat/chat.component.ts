import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from '../../services/chat.service';
import { TripsService } from '../../services/trips.service';

export interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService, private tripsService: TripsService) {}

  ngOnInit(): void {
    // Get incidents and initialize chat messages
    this.tripsService.getIncidents(1234).subscribe(incidents => {
      this.chatService.initMessage(incidents).subscribe(
        response => {
          // Split the response content by newline characters
          const responseParts = response.message.content.split('\n');
          // Push each part as a separate message
          responseParts.forEach((part: String) => {
            if (part.trim()) { // Ensure that we don't add empty lines as messages
              this.messages.push({ role: 'assistant', content: part.trim() });
            }
          });
        }
      );
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      return;
    }

    this.messages.push({ role: 'user', content: this.newMessage });

    this.chatService.sendMessage(this.messages).subscribe(
      response => {
        // Split the response content by newline characters
        const responseParts = response.message.content.split('\n');
        // Push each part as a separate message
        responseParts.forEach((part: String) => {
          if (part.trim()) { // Ensure that we don't add empty lines as messages
            this.messages.push({ role: 'assistant', content: part.trim() });
          }
        });
      }
    );

    this.newMessage = '';
  }
}
