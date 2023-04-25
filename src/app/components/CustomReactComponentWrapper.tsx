import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as React from 'react';
import { Root, createRoot } from 'react-dom/client';
import { NavbarComponent } from './CustomReactComponent';
import { AuthService } from '../shared/auth.service';
import { User } from 'firebase/auth';


const containerElementName = 'myReactComponentContainer';

@Component({
  selector: 'navbar',
  template: `<span #${containerElementName}></span>`,
  // styleUrls: [''],
  encapsulation: ViewEncapsulation.None,
})
export class CustomReactComponentWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

  user = this.authService.getUser();
  root: Root | null = null;

  constructor(public authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.render();
  }

  ngOnDestroy() {
    this.root?.unmount();
  }

  private render() {
    this.root?.render(
        <React.StrictMode>
            <div>
          <NavbarComponent
            user$={this.user}
            handleGoogleAuth={this.authService.GoogleAuth.bind(this.authService)}
            handleSignOut={this.authService.SingOut.bind(this.authService)} />
            </div>
        </React.StrictMode>);
  }
}
