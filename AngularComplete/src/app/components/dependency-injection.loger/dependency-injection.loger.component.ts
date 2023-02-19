import { Component } from '@angular/core';
import { Logger } from '../../services/logger.service';

@Component({
  selector: 'app-dependency-injection-loger',
  templateUrl: './dependency-injection.loger.component.html',
})
export class DependencyInjectionLogerComponent {
  count = 0;
  constructor(private logger: Logger) {}

  onLogMe() {
    this.logger.writeCount();
    this.count = this.logger.count;
  }
}
