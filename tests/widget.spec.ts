
import { test, expect } from '@playwright/test';
import { WidgetPage } from './widget.page';

test.describe('Uchi.ru widget', () => {
    let widgetPage: WidgetPage;

    test.beforeEach(async ({ page }) => {
        widgetPage = new WidgetPage(page);

        await page.goto('/', {
            waitUntil: 'domcontentloaded'
        });

        const cookieButtons = page.locator(
            '._UCHI_COOKIE__button'
        );

        const visibleCookieButton = cookieButtons
            .filter({ visible: true })
            .first();

        if (await visibleCookieButton.isVisible()) {
            await visibleCookieButton.click();
        }
    });

    test('opens', async () => {
        await widgetPage.openWidget();

        await expect(
            widgetPage.getWidgetBody()
        ).toBeVisible();
    });

    test('has correct title', async () => {
        await widgetPage.openWidget();

        const articles = await widgetPage.getPopularArticles();
        await articles[0].click();

        await widgetPage.clickWriteToUs();

        await expect(
            widgetPage.getTitle()
        ).toHaveText('Связь с поддержкой');
    });

    test('displays popular articles', async () => {
        await widgetPage.openWidget();

        const articles = await widgetPage.getPopularArticles();

        expect(articles.length).toBeGreaterThan(0);

        const firstArticle = articles[0];

        await expect(firstArticle).toBeVisible();

        const articleTitle = widgetPage.getArticleTitle(
            firstArticle
        );

        await expect(articleTitle).toBeVisible();
        await expect(articleTitle).not.toHaveText('');
    });
});
