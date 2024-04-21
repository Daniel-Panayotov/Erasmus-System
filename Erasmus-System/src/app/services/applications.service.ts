import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PDFDocument, StandardFonts, PageSizes, rgb } from 'pdf-lib';
import { applicationFormModel } from '../shared/environments/applicationFormEnv';
import { adminRecords } from '../types/adminDocs';
import { ApiService } from './general-services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private apiService = inject(ApiService);
  private cookieService = inject(CookieService);

  async fetchStaticPdfFiles() {
    const cookie = this.cookieService.get(environment.authCookieName);
    try {
      const uniLogo = await (
        await this.apiService.getStaticFile(cookie, 'uni_logo.png ')
      ).blob();
      const erasmusLogo = await (
        await this.apiService.getStaticFile(cookie, 'erasmus_logo.jpg ')
      ).blob();

      const uniLogoBytes = new Uint8Array(await uniLogo.arrayBuffer());
      const erasmusLogoBytes = new Uint8Array(await erasmusLogo.arrayBuffer());

      return { uniLogoBytes, erasmusLogoBytes };
    } catch (err: any) {
      const { message } = await err.json();
      return { error: message };
    }
  }

  async createPdfFromForm(form: FormGroup, documents: adminRecords) {
    const formValues = form.value;
    formValues.receivingErasmusCode = 'BG ROUSSE 01';
    formValues.receivingUniName = 'University of Ruse "Angel Kunchev"';
    formValues.receivingUniAddress = '8 Student str 7017, Ruse, Bulgaria';

    const pdf = await PDFDocument.create();
    pdf.embedFont(StandardFonts.Helvetica);

    const { uniLogoBytes, erasmusLogoBytes, error } =
      await this.fetchStaticPdfFiles();
    if (error) return { error };

    let recHeight = 50;
    const textBoxPadding = 10;
    const pagePadding = 30;

    const pdfUniLogo = await pdf.embedPng(uniLogoBytes as Uint8Array);
    const { width: f, height: f2 } = pdfUniLogo.scaleToFit(100, 100);
    const pdfErasmusLogo = await pdf.embedJpg(erasmusLogoBytes as Uint8Array);
    const { width: x, height: x2 } = pdfErasmusLogo.scaleToFit(100, 100);

    let page = pdf.addPage(PageSizes.A4);
    page.setFontSize(12);
    let { width: pageWidth, height: pageHeight } = page.getSize();

    pageHeight -= pagePadding;
    pageWidth -= pagePadding;

    page.drawImage(pdfUniLogo, {
      x: pagePadding,
      y: pageHeight - f2,
      width: f,
      height: f2,
    });

    page.drawImage(pdfErasmusLogo, {
      x: pageWidth - x,
      y: pageHeight - x2 - (f2 - x2),
      width: x,
      height: x2,
    });

    pageHeight -= 150;

    for (let sectionName in applicationFormModel) {
      const section = applicationFormModel[sectionName];

      if (section.sectionName) {
        page.drawText(section.sectionName, {
          x: pagePadding,
          y: pageHeight,
          size: 20,
        });
        pageHeight -= 60;
      }

      for (let i = 0; i < section.sectionData.length; i++) {
        const sectionField = section.sectionData[i];
        let value = sectionField.text ? `${sectionField.text}: ` : '';

        if (pageHeight <= 15) {
          page = pdf.addPage(PageSizes.A4);
          page.setFontSize(12);
          let { width, height } = page.getSize();
          pageWidth = width - pagePadding;
          pageHeight = height - pagePadding - recHeight;
        }

        if (sectionField.properties.isImg) {
          value = formValues[sectionField.properties.list[0]];

          const x: any = document.getElementById(
            sectionField.properties.list[0]
          );

          value = x.files[0];
        } else if (sectionField.properties.isRef) {
          const refSection = sectionField.properties.isRef;
          const unfilteredDocs = documents[refSection.apiModule];

          const doc = unfilteredDocs.filter(
            (v) =>
              v[refSection.mainProp] ==
              formValues[sectionField.properties.list[0]]
          )[0];

          value += refSection.list
            .map((v) => doc[v])
            .join(sectionField.properties.separator);
        } else
          value += sectionField.properties.list
            .map((v) => formValues[v])
            .join(sectionField.properties.separator);

        switch (typeof value) {
          case 'object':
            const image = new Uint8Array(await (value as File).arrayBuffer());
            /*
            
            
            */
            const pdfImg = await pdf.embedJpg(image);
            /*
            
            
            */
            const { width, height } = pdfImg.scaleToFit(100, 100);

            recHeight = height + textBoxPadding * 2;

            page.drawImage(pdfImg, {
              x: pagePadding + textBoxPadding,
              y: pageHeight - recHeight / 2,
              height,
              width,
            });

            pageHeight -= recHeight / 2 + 10;
            break;
          case 'string':
            page.drawText(value, {
              x: pagePadding + textBoxPadding,
              y: pageHeight + textBoxPadding * 2,
            });
            break;
        }

        page.drawRectangle({
          x: pagePadding,
          y: pageHeight,
          width: pageWidth - pagePadding,
          height: recHeight,
          borderWidth: 0.2,
          borderColor: rgb(0, 0, 0),
        });

        recHeight = 50;
        pageHeight -= recHeight;
      }
    }

    const pdfBytes = await pdf.save();
    return { pdfBytes };
  }
}
