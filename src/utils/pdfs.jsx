'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export default function PDFViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <div>
      <Document
        file={{ url: fileUrl }}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={console.error}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
