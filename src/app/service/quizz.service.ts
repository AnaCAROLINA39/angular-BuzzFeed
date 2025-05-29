import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  results: { [key: string]: string };
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Option {
  id: number;
  text: string;
  alias: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
 private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuiz(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/quizzes`);
  }

  // Adicionar uma nova pergunta
  addQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, question);
  }

  // Atualizar uma pergunta
  updateQuestion(id: number, question: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, question);
  }

  // Deletar uma pergunta
  deleteQuestion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
