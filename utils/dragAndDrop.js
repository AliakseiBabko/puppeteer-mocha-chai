
module.exports = {

  dragAndDrop: async function(page, sourceSelector, destinationSelector) {
    await page.waitForSelector(sourceSelector);
    await page.waitForSelector(destinationSelector);
    const sourceElement = await page.$(sourceSelector);
    const destinationElement = await page.$(destinationSelector);
    const sb = await sourceElement.boundingBox();
    const db = await destinationElement.boundingBox();

    const sourceX = sb.x + sb.width / 2;
    const sourceY = sb.y + sb.height / 2;
    const destinationX = db.x + db.width / 2;
    const destinationY = db.y + db.height / 2;

    const waitTime = 1000;
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    await page.mouse.move(sourceX, sourceY);
    await sleep(waitTime);
    await page.mouse.down();    
    await sleep(waitTime);
    await page.mouse.move(destinationX, destinationY);
    await sleep(waitTime);    
    await page.mouse.up();
  },

  //this solution is based on: https://gist.github.com/wardnath/0aa9f293ee964c3a2bc149d9e924822e
  dragAndDropHTML5: async function(page, sourceSelector, destinationSelector) {
    await page.waitForSelector(sourceSelector);
    await page.waitForSelector(destinationSelector);
    const sourceElement = await page.$(sourceSelector);
    const destinationElement = await page.$(destinationSelector);
    const sourceBox = await sourceElement.boundingBox();
    const destinationBox = await destinationElement.boundingBox();

    await page.evaluate(
      async (ss, ds, sb, db) => {
        const waitTime = 2000;
        const sleep = (milliseconds) => {
          return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        const source = document.querySelector(ss);
        const destination = document.querySelector(ds);

        const sourceX = sb.x + sb.width / 2;
        const sourceY = sb.y + sb.height / 2;
        const destinationX = db.x + db.width / 2;
        const destinationY = db.y + db.height / 2;

        const dataTransfer = new DataTransfer();
        dataTransfer.effectAllowed = 'all';

        source.dispatchEvent(
          new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            screenX: sourceX,
            screenY: sourceY,
            clientX: sourceX,
            clientY: sourceY
          })
        );
        await sleep(waitTime);
        source.dispatchEvent(
          new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            screenX: sourceX,
            screenY: sourceY,
            clientX: sourceX,
            clientY: sourceY,
          })
        );
        await sleep(waitTime);
        source.dispatchEvent(
          new DragEvent('dragstart', {
            bubbles: true,
            cancelable: true,
            screenX: sourceX,
            screenY: sourceY,
            clientX: sourceX,
            clientY: sourceY,
            dataTransfer
          })
        );
        await sleep(waitTime);
        destination.dispatchEvent(
          new DragEvent('dragover', {
            bubbles: true,
            cancelable: true,
            screenX: destinationX,
            screenY: destinationY,
            clientX: destinationX,
            clientY: destinationY,
            dataTransfer
          })
        );
        await sleep(waitTime);
        destination.dispatchEvent(
          new DragEvent('drop', {
            bubbles: true,
            cancelable: true,
            screenX: destinationX,
            screenY: destinationY,
            clientX: destinationX,
            clientY: destinationY,
            dataTransfer
          })
        );
        await sleep(waitTime);
        source.dispatchEvent(
          new DragEvent('dragend', {
            bubbles: true,
            cancelable: true,
            screenX: destinationX,
            screenY: destinationY,
            clientX: destinationX,
            clientY: destinationY
          })
        );
      },
      sourceSelector,
      destinationSelector,
      sourceBox,
      destinationBox
    )
  }
}
