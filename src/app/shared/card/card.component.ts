import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() cardType : "content" | "text" = 'text'

  @Input() cardContent : { title: string, iconTitle?: string, iconTitleSize?: string , content?: string, footer?: string, icon?: string }  = {
    title: 'Title',
    iconTitle: '',
  }

  @Input() cardStyle : { header?: {backgroundColor?: string, color?: string, fontWeight?: string}, content?: {color?: string, fontWeight?: string} , footer?: {backgroundColor?: string, color?: string, fontWeight?: string} } = {
    header: {
      color: 'black',
    },
    footer: {
      color: 'black',
    }
  }

}
