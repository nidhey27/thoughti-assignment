import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

import data from '../../../app/data.json';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @ViewChild('flag') flag!: ElementRef;

  task: string = ''
  words = 0
  expiry_date = new Date().toISOString().slice(0, 10)
  user: String = '0'
  importantFlag = false
  users = data[0].users
  tasks: any = data[0].tasks

  constructor(
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    console.log(data)
  }

  // Count Task Words
  valueChange(v: any) {
    this.words = v.length
  }

  // Mark Task as Important
  markImportant() {

    this.importantFlag = !this.importantFlag
    console.log(this.importantFlag);
    if (this.importantFlag) {
      this.flag.nativeElement.classList.remove('fa-flag-o')
      this.flag.nativeElement.classList.add('fa-flag')
    } else {
      this.flag.nativeElement.classList.remove('fa-flag')
      this.flag.nativeElement.classList.add('fa-flag-o')
    }
  }

  // Add task to list
  submit() {
    if (this.task == '') {
      this._toast.openSnackBar('Please enter a task', 0)
      return 0
    }

    if ((this.expiry_date).toString() < new Date().toISOString().slice(0, 10)) {
      this._toast.openSnackBar('Please enter a valid expiry date', 0)
      return 0
    }

    if (this.user == '0') {
      this._toast.openSnackBar('Please select a user', 0)
      return 0
    }


    if (this.tasks.some((item: any) => item.task == this.task)) {
      this._toast.openSnackBar('Task already exists', 0)
      return 0
    }


    this.tasks.push({
      task: this.task,
      expiry_date: this.expiry_date,
      user: this.user,
      important: this.importantFlag

    })
    this._toast.openSnackBar('Task Added', 1)
    this.task = ''
    this.expiry_date = new Date().toISOString().slice(0, 10)
    this.user = '0'
    this.importantFlag = false
    return 1

  }

  // Remove task from list
  removeTask(i: number) {
    this.tasks.splice(i, 1)
    this._toast.openSnackBar('Task Removed', 1)
  }


}
