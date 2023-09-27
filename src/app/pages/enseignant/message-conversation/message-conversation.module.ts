import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageConversationPageRoutingModule } from './message-conversation-routing.module';

import { MessageConversationPage } from './message-conversation.page';
import { EnseignantHeaderComponentModule } from 'src/app/components/enseignant-header/enseignant-header.component.module';
import { Media } from '@awesome-cordova-plugins/media/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageConversationPageRoutingModule,
    EnseignantHeaderComponentModule
  ],
  declarations: [MessageConversationPage],
  providers: [
    Media,
    File
  ]
})
export class MessageConversationPageModule {}
