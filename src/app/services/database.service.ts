import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { JsonSQLite, CapacitorSQLite } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
//const { CapacitorSQLite } = Plugins;

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'cole-notas';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  dbReady = new BehaviorSubject(false);
  dbName = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController, private platform: Platform) { }

  async init() {
    if(this.isMobile()) {
      console.log('alla 0')
      try {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermissions();
        this.setupDatabase();
      } catch (e) {
        const alert = await this.alertCtrl.create({
          header: 'No DB access',
          message: "This app can't work without Database access.",
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      console.log('aca')
      this.setupDatabase();
    }
  }

  private async setupDatabase() {
    console.log('setup init')
    const dbSetupDone = await Storage.get({ key: DB_SETUP_KEY });

    console.log(DB_SETUP_KEY)
    console.log('setup init 2')
    console.log(dbSetupDone)

    if (!dbSetupDone.value) {
      this.downloadDatabase();
    } else {
      this.dbName = (await Storage.get({ key: DB_NAME_KEY })).value || '';
      await CapacitorSQLite.open({ database: this.dbName });
      this.dbReady.next(true);
    }
  }

  private downloadDatabase(update = false) {
    this.http.get('https://drive.google.com/file/d/1LxoZLmqZCEzKsMSnqleIPwLYc-aSus-3/view?usp=drive_link').subscribe(async (jsonExport: any) => {
      const jsonstring = JSON.stringify(jsonExport);
      const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });

      if (isValid.result) {
        this.dbName = jsonExport.database;
        await Storage.set({ key: DB_NAME_KEY, value: this.dbName });
        await CapacitorSQLite.importFromJson({ jsonstring });
        await Storage.set({ key: DB_SETUP_KEY, value: '1' });

        // Your potential logic to detect offline changes later
        if (!update) {
          await CapacitorSQLite.createSyncTable({ database: this.dbName });
        } else {
          await CapacitorSQLite.setSyncDate({ syncdate: '' + new Date().getTime() })
        }
        this.dbReady.next(true);
      }
    });
  }

  isMobile(): boolean {
    return (this.platform.is('android') || this.platform.is('ios') || this.platform.is('hybrid') || !this.platform.is('mobileweb'));
  }

  async getProfesorByCorreo(correo: any) {
    const statement = `SELECT * FROM profesor WHERE correo = ${correo}`;
    const record = await CapacitorSQLite.query({ statement, values: [] })
    return (record.values) ? record.values[0] : '';
  }

  getDatabaseExport(mode: any) {
    return CapacitorSQLite.exportToJson({ jsonexportmode: mode })
  }
}