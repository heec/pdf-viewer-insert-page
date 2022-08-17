import { PdfWebViewer } from '@pdf-tools/four-heights-pdf-web-viewer'
import { PDFDocument } from 'pdf-lib'
import './styles.css'

const viewerElement = document.getElementById('pdfviewer')
const license = ''
const options = {
  viewer: {
    customButtons: {
      annotationbar: [
        {
          text: 'Add new page',
          icon: 'file-plus.svg',
          onClick: insertPage
        }
      ]
    }
  }
}

const pdfViewer = new PdfWebViewer(viewerElement, license, options)

async function insertPage() {
  // save document
  let pdfBytes = await pdfViewer.saveFile()

  // open document in pdf-lib
  const pdfDoc = await PDFDocument.load(pdfBytes)

  // get the page size from the last page
  const pages = pdfDoc.getPages()
  const lastPage = pages[0]
  const { width, height } = lastPage.getSize()

  // append a new page with the same size as the last page in the document
  const newPage = pdfDoc.addPage([width, height])

  // draw some text to the new page
  newPage.drawText('This page was added with JavaScript', {
    x: 10,
    y: height - 24,
    size: 14
  })

  // one time callback to navigate to the new page
  const newPageCount = pdfDoc.pageCount
  const gotoLastPage = () => {
    pdfViewer.setPageNumber(newPageCount)
    pdfViewer.removeEventListener('documentLoaded', gotoLastPage)
  }
  pdfViewer.addEventListener('documentLoaded', gotoLastPage)

  // open the modified document in the viewer
  pdfBytes = await pdfDoc.save()
  pdfViewer.openFile(new File([pdfBytes], '', { type: 'application/pdf' }))
}
