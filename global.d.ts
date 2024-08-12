// global.d.ts

interface Jupiter {
  init: (config: {
    displayMode: string;
    integratedTargetId: string;
    endpoint: string;
    strictTokenList: boolean;
    defaultExplorer: string;
    formProps: {
      initialAmount: string;
      initialInputMint: string;
      initialOutputMint: string;
    };
  }) => void;
}

interface Window {
  Jupiter?: Jupiter;
}
