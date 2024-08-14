import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../../services/chat.service';

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
export class ChatComponent implements OnInit{
  messages: Message[] = [];
  newMessage: string = '';
  chatResponse: string = '';

  constructor (private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.initMessage().subscribe(
      response => {
        console.log(response)
        // Handle the response from the initMessage call
        this.chatResponse = response; // Assuming response is of type string or can be JSON parsed
      }
    );
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
