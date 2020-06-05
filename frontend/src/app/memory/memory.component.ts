import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MemoryService } from '../shared/memory/memory.service';
import { Memory } from '../shared/memory/memory.model';
import {UserService} from '../shared/user/user.service';

declare var M: any;

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css'],
  providers: [MemoryService]
})

export class MemoryComponent implements OnInit {

  userDetails;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private userService: UserService, private memoryService: MemoryService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshMemoryList();

    // Récupération des informations de l'utilisateur
    this.userService.getUserPayload().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.memoryService.selectedMemory = {
      _id: '',
      author: '',
      title: '',
      text: '',
      date: null
    };
    this.serverErrorMessages = '';
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.memoryService.postMemory(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshMemoryList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    } else {
      this.memoryService.putMemory(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshMemoryList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshMemoryList() {
    this.memoryService.getMemoryList().subscribe((res) => {
      this.memoryService.memories = res as Memory[];
    });
  }

  onEdit(mem: Memory) {
    this.memoryService.selectedMemory = mem;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.memoryService.deleteMemory(_id).subscribe((res) => {
        this.refreshMemoryList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
