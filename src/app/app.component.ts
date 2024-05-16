import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, TableModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  words: Word[] = [];
  possibleWords: string[] = []
  errorMessage: string = "";

  addWord() {
    this.words.push({ word: "", correctLetters: 0 });
  }

  removeItem(index: number) {
    this.words.splice(index, 1)
  }

  refreshPossibleWords(){

    this.possibleWords = []

    if(this.words.length <= 0) return

    const wordLength = this.words[0].word.length

    const wordsWithDifferentNumberOfLetters = this.words.filter(w => w.word.length != wordLength)
    
    if(wordsWithDifferentNumberOfLetters.length > 0){
      this.errorMessage = "All words must have the same number of letters."
      return
    }

    let uniqueWords:string[] = []
    for(let word of this.words){
      if(uniqueWords.includes(word.word.toUpperCase())){
        this.errorMessage = "Please remove duplicate words."
        return
      }
      uniqueWords.push(word.word.toUpperCase())
    }

    this.errorMessage = ""

    for(let word of this.words){
      this.possibleWords.push(word.word.toUpperCase())
    }

    for(let word of this.words){
      if(word.correctLetters > 0){
        let wordIndex = this.possibleWords.indexOf(word.word.toUpperCase())
        this.possibleWords.splice(wordIndex, 1)
        for(let wordForComparison of this.words){
          if(word.word.toUpperCase() == wordForComparison.word.toUpperCase()) continue;
          let equalLetters = 0
          for(let i = 0; i<wordLength; i++){
            if(word.word[i].toUpperCase() == wordForComparison.word[i].toUpperCase()){
              equalLetters++;
            }
          }
          if(equalLetters != word.correctLetters){
            let index = this.possibleWords.indexOf(wordForComparison.word.toUpperCase())
            this.possibleWords.splice(index, 1)
          }
        }
      }
    }

  }
}

type Word = {
  word: string;
  correctLetters: number;
};
