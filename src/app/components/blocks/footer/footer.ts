import {Component} from '@angular/core';
import {VkIcon} from '../../svg/vk-icon/vk-icon';
import {Container} from '../container/container';

@Component({
  selector: 'app-footer',
  imports: [
    VkIcon,
    Container
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
