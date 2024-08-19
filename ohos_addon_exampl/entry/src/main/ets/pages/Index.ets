import { hilog } from '@kit.PerformanceAnalysisKit';
import * as testNapi from 'libentry.so';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World';

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            const a = testNapi;
            const ret = testNapi.basic_types_boolean.createBoolean(false);
            console.log(`${ret}`);
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}
