import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MemoryService } from '../shared/memory/memory.service';
import { Memory } from '../shared/memory/memory.model';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/user.service';

declare var M: any;

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css'],
  providers: [MemoryService]
})

export class MemoryComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private memoryService: MemoryService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.refreshMemoryList();

    console.log(this.memoryService.memories);
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.memoryService.selectedMemory = {
      _id: '',
      author: '',
      title: '',
      text: ''
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
    this.memoryService.getMemoryList().subscribe(
      res => {
      this.memoryService.memories = res as Memory[];
    },
      err => {
        console.log(err);
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

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
