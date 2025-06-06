import { createHTMLElement } from 'sharable';
import { ValueObserver } from 'sharable';
import './PromiseFeedback.css';

const Status = {
  Waiting: "waiting",
  Loading: "loading",
  Success: "success",
  Failure: "failure"
} as const;

export type Status = typeof Status[keyof typeof Status];

export class PromiseFeedback<T> {
  private _component: HTMLDivElement;

  private status: ValueObserver<Status>;

  private _defaultContent: string;
  private _loadingContent: string;
  private _successContent: string;
  private _errorContent: string;


  constructor(defaultContent?: string, loadingContent?: string, sucessContent?: string, errorContent?: string) {
    this._component = createHTMLElement("div", { id: "feedback-wrapper" });

    this.status = new ValueObserver<Status>(Status.Waiting);
    this.status.subscribe(this.updateState.bind(this));

    this._defaultContent = defaultContent ? defaultContent : "Waiting for user action";
    this._loadingContent = loadingContent ? loadingContent : "Loading, please wait...";
    this._successContent = sucessContent ? sucessContent : "Success, information was correctly fetched";
    this._errorContent = errorContent ? errorContent : "Error while fetching information";

    const infoContent = createHTMLElement("p", { id: "feedback-info" }, this._defaultContent);
    this._component.append(infoContent);
  }

  public get component(): HTMLDivElement { return this._component; }
  public set defaultContent(value: string) { this._defaultContent = value; }
  public set loadingContent(value: string) { this._loadingContent = value; }
  public set successContent(value: string) { this._successContent = value; }
  public set errorContent(value: string) { this._errorContent = value; }





  public from(promise: () => Promise<T>, success?: (data:T) => void, failure?: (error:T) => void): void {
    const oldRetryButton = this._component.querySelector("#retry-button");
    const newRetryButton = createHTMLElement("button", { id: "retry-button", class: "hidden" }, "Click to retry");
    if (oldRetryButton) {
      this._component.replaceChild(newRetryButton, oldRetryButton);

    }else this._component.appendChild(newRetryButton);

    newRetryButton.addEventListener("click", () => {this.from(promise);});
    this.status.value = Status.Loading;

    promise()
      .then((result) => {
        this.status.value = Status.Success;
        if(success) success(result);
      })
      .catch((error) => {
        this.status.value = Status.Failure;
        if(failure) failure(error);

      })
  }



  private updateState(value: Status): void {
    const infoContent = this._component.querySelector('#feedback-info')!;
    infoContent.classList = "";

    const retryButton = this._component.querySelector('#retry-button')!;
    retryButton.classList.add("hidden");

    switch (value) {
      case Status.Waiting:
        infoContent.textContent = this._defaultContent;
        break;

      case Status.Loading:
        infoContent.textContent = this._loadingContent;
        break;

      case Status.Success:
        infoContent.textContent = this._successContent;
        infoContent.classList.add("success");
        break;

      case Status.Failure:
        infoContent.textContent = this._errorContent;
        infoContent.classList.add("error");
        retryButton.classList.remove("hidden");
    }
  }
}
