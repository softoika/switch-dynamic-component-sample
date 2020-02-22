import { Component, OnInit } from '@angular/core';
import {
  FormItem,
  FormItemType,
  TextField,
  RadioButton,
  Datepicker,
} from 'src/app/form/form-item';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  formItems: FormItem[] = [
    {
      type: FormItemType.TextField,
      id: 'd44e0d0e-be59-4f37-a45c-9b000c60db80',
      title: '氏名',
      required: true,
      placeholder: '氏名を入力してください。',
    } as TextField,
    {
      type: FormItemType.RadioButton,
      id: '521d64f2-ddb2-4f49-b25e-4f805a3fd1e3',
      title: '満足度',
      required: true,
      options: [
        { label: 'とてもよかった', value: 5 },
        { label: 'まあまあよかった', value: 4 },
        { label: '普通', value: 3 },
        { label: 'あまりよくなかった', value: 2 },
        { label: 'よくなかった', value: 1 },
      ],
    } as RadioButton,
    {
      type: FormItemType.Datepicker,
      id: '7345d53b-6920-497d-836c-620d2850aba7',
      title: '次回の希望日',
      required: false,
      min: dayjs('2021-02-22').toDate(),
      max: dayjs('2021-02-22')
        .add(3, 'month')
        .toDate(),
    } as Datepicker,
  ];
  ngOnInit() {}

  consoleLog(value: any) {
    console.log(value);
  }
}
