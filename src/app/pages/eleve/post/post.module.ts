import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';
import { ParentHeaderComponentModule } from 'src/app/components/parent-header/parent-header.component.module';
import { Media } from '@awesome-cordova-plugins/media/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    ReactiveFormsModule,
    ParentHeaderComponentModule
  ],
  declarations: [PostPage],
  providers: [
    Media
  ]
})
export class PostPageModule {}
