import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export interface Message {
  sender: 'user' | 'assistant';
  text: string;
}
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.less'
})
export class ChatComponent {
  messages: Message[] = [];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      console.log('message')
      // Add user message
      this.messages.push({ sender: 'user', text: this.newMessage });

      // Simulate sending message to a backend or chat service
      this.getResponseFromAssistant(this.newMessage).then(response => {
        // Add assistant response
        this.messages.push({ sender: 'assistant', text: response });
      });

      // Clear the input
      this.newMessage = '';
    }
  }

  // Simulate a function to get a response from the assistant
  getResponseFromAssistant(userMessage: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`You said: "${userMessage}". This is a response from the assistant.`);
      }, 1000);
    });
  }
}
