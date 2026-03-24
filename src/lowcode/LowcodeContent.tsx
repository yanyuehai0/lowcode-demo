import { init } from "@alilc/lowcode-engine";
import { memo, useEffect, useRef } from "react";

const RequestHandlersMap = {
  fetch: () => {
    console.log("暂不支持 fetch");
    return Promise.resolve();
  },
};

const LowcodeContent = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init(container.current!, {
      locale: "zh-CN",
      enableCondition: true,
      enableCanvasLock: true,
      requestHandlersMap: RequestHandlersMap,
      // 默认绑定变量
      supportVariableGlobally: true,
      enableContextMenu: true,
    });
  }, []);

  return <div ref={container} id="lce-container"></div>;
};

export default memo(LowcodeContent);
