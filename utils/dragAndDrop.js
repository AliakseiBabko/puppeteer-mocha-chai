
//attempt 1
/*
async function dragAndDrop(page, sourceSelector, destinationSelector) {
    await page.waitForSelector(sourceSelector);
    await page.waitForSelector(destinationSelector);
    const origin = await page.$(sourceSelector);
    const destination = await page.$(destinationSelector);
    const ob = await origin.boundingBox();
    const db = await destination.boundingBox();
  
    console.log(`Dragging from ${ob.x + ob.width / 2}, ${ob.y + ob.height / 2}`);
    await page.mouse.move(ob.x + ob.width / 2, ob.y + ob.height / 2);    
    await page.mouse.down();
    await page.waitForTimeout(2000);
    console.log(`Dropping at ${db.x + db.width / 2}, ${db.y + db.height / 2}`);
    await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2);
    await page.waitForTimeout(2000);
    await page.mouse.up();
  };
*/
//attempt 2
/*
async function dragAndDrop(page, sourceSelector, destinationSelector) {
  const sourceElement = await page.waitForSelector(sourceSelector);
  const destinationElement = await page.waitForSelector(destinationSelector);

  const sourceBox = await sourceElement.boundingBox();
  const destinationBox = await destinationElement.boundingBox();

  await page.evaluate(
    async (ss, ds, sb, db) => {
      const waitTime = 2000
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
      const source = document.querySelector(ss);
      const destination = document.querySelector(ds);

      const sourceX = sb.x + sb.width / 2;
      const sourceY = sb.y + sb.height / 2;
      const destinationX = db.x + db.width / 2;
      const destinationY = db.y + db.height / 2;

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
      await sleep(waitTime)
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
      await sleep(waitTime)
      const dataTransfer = new DataTransfer();
      dataTransfer.effectAllowed = 'all';
      dataTransfer.dropEffect = 'none';
      dataTransfer.files = [];
      let dragstart = source.dispatchEvent(
        new DragEvent('dragstart', {
          dataTransfer,
          bubbles: true,
          cancelable: true,
          screenX: sourceX,
          screenY: sourceY,
          clientX: sourceX,
          clientY: sourceY,
        })
      );

      await sleep(waitTime)

      await sleep(waitTime)
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
      await sleep(waitTime)
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
      await sleep(waitTime)
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
  );
}
*/
//attempt 3

async function dragAndDrop(page, originSelector, destinationSelector) {
  const origin = await page.waitForSelector(originSelector);
  const destination = await page.waitForSelector(destinationSelector);
  const originBox = await origin.boundingBox();
  const destinationBox = await destination.boundingBox();
  const lastPositionCoordenate = (box) => ({
    x: box.x + box.width / 2,
    y: box.y + box.height,
  });
  
  const getPayload = (box) => ({
    bubbles: true,
    cancelable: true,
    screenX: lastPositionCoordenate(box).x,
    screenY: lastPositionCoordenate(box).y,
    clientX: lastPositionCoordenate(box).x,
    clientY: lastPositionCoordenate(box).y,
  });

  // Function in browser.
  const pageFunction = async (_originSelector, _destinationSelector, originPayload, destinationPayload) => {
    const _origin = document.querySelector(_originSelector);
    let _destination = document.querySelector(_destinationSelector);
    // If has child, put at the end.
    _destination = _destination.lastElementChild || _destination;

    // Init Events
    _origin.dispatchEvent(new MouseEvent('pointerdown', originPayload));
    _origin.dispatchEvent(new DragEvent('dragstart', originPayload));

    await new Promise((resolve) => setTimeout(resolve, 2000));
    _destination.dispatchEvent(new MouseEvent('dragenter', destinationPayload));
    _origin.dispatchEvent(new DragEvent('dragend', destinationPayload));
  };

  // Init drag and drop.
  await page.evaluate(
    pageFunction,
    originSelector,
    destinationSelector,
    getPayload(originBox),
    getPayload(destinationBox),
  );
}

module.exports = dragAndDrop;