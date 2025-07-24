import {Component} from '@angular/core';
import {VkIcon} from '../../svg/vk-icon/vk-icon';
import {Container} from '../container/container';
import {TelegramIcon} from '../../svg/telegram-icon/telegram-icon';

@Component({
  selector: 'app-footer',
  imports: [
    VkIcon,
    Container,
    TelegramIcon
  ],
  templateUrl: './footer.html',
  standalone: true,
  styleUrl: './footer.scss'
})
export class Footer {

}
