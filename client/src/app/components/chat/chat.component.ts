import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from '../../services/chat.service';

export interface Message {
  sender: 'user' | 'assistant';
  text: string;
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

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Display default message upon initialization
    this.chatService.initMessage().subscribe(
      response => {
        this.messages.push({ sender: 'assistant', text: response.message.content });
      }
    );
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      return;
    }

    // Add user's message to messages array
    this.messages.push({ sender: 'user', text: this.newMessage });

    // Call the chat service and handle the response
    this.chatService.initMessage().subscribe(
      response => {
        // Add assistant's response to messages array
        this.messages.push({ sender: 'assistant', text: response.message });
      }
    );

    // Clear the input field after sending the message
    this.newMessage = '';
  }
}