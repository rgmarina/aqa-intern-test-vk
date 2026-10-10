import { Page, Locator } from '@playwright/test';

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test="openWidget"]',
    BUTTON_WRITE_TO_US = '[data-test="button_feedback_form"]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
    ARTICLE_TITLE = '[class^="title__"]',
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper(): Locator {
        return this.page.locator(WidgetPage.selector.WRAPPER);
    }

    async openWidget(): Promise<void> {
        const openButton = this.page.locator(
            WidgetPage.selector.BUTTON_OPEN
        );

        await openButton.click();

        await this.getWidgetBody().waitFor({
            state: 'visible'
        });
    }

    async getPopularArticles(): Promise<Locator[]> {
        const articles = this.wrapper().locator(
            WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM
        );

        await articles.first().waitFor({
            state: 'visible',
            timeout: 10000
        });

        return articles.all();
    }

    getArticleTitle(article: Locator): Locator {
        return article.locator(
            WidgetPage.selector.ARTICLE_TITLE
        );
    }

    async clickWriteToUs(): Promise<void> {
        await this.wrapper()
            .locator(WidgetPage.selector.BUTTON_WRITE_TO_US)
            .click();
    }

    getTitle(): Locator {
        return this.wrapper().locator(
            WidgetPage.selector.HEADER_TEXT
        );
    }

    getWidgetBody(): Locator {
        return this.page.locator(
            WidgetPage.selector.WIDGET_BODY
        );
    }
}
