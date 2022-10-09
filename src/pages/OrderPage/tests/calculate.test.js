import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import Type from '../Type';
import OrderPage from '../OrderPage';

test("update product's total when products change", async () => {
    render(<Type orderType="products" />);

    // exact : false 를 옵션을 설정하면 '상품 총 가격:'이라는 텍스트 뒤의 element도 잡아준다.
    const productsTotal = screen.getByText('상품 총 가격:', { exact: false });
    expect(productsTotal).toHaveTextContent('0');

    // 아메리카 여행 상품 한개 올리기
    const americaInput = await screen.findByRole('spinbutton', { name: 'America' });

    /* userEvent.clear()는 input이나 textarea에 텍스트를 선택한 후 제거 해준다.
     * 현재 소스 코드 보다 위에서 같은 엘리먼트를 위한 userEvent를 사용했을 때 유용하다.
     * clear 해준 후에 userEvenet.type()을 하는 것이 좋다.
     */
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');
    expect(productsTotal).toHaveTextContent('1000');
});

test("update option's total when options change", async () => {
    render(<Type orderType="options" />);

    const optionsTotal = screen.getByText('옵션 총 가격:', { exact: false });
    expect(optionsTotal).toHaveTextContent('0');

    const insuranceCheckbox = await screen.findByRole('checkbox', {
        name: 'Insurance'
    });

    userEvent.click(insuranceCheckbox);
    expect(optionsTotal).toHaveTextContent('500');

    const dinnerCheckbox = await screen.findByRole('checkbox', {
        name: 'Dinner'
    });

    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent('1000');

    userEvent.click(dinnerCheckbox);
    expect(optionsTotal).toHaveTextContent('500');
});

describe('total price of goods and options', () => {
    test('total price starts width 0 and Updating total price when adding one product', async () => {
        render(<OrderPage />);

        const total = screen.getByText('Total Price:', { exact: false });
        expect(total).toHaveTextContent('0');

        const americaInput = await screen.findByRole('spinbutton', {
            name: 'America'
        });

        userEvent.clear(americaInput);
        userEvent.type(americaInput, '1');

        expect(total).toHaveTextContent('1000');
    });

    test('Updating total price when adding one option', async () => {
        render(<OrderPage />);

        const total = screen.getByText('Total Price:', { exact: false });
        expect(total).toHaveTextContent('0');

        const insuranceCheckbox = await screen.findByRole('checkbox', {
            name: 'Insurance'
        });

        userEvent.click(insuranceCheckbox);
        expect(total).toHaveTextContent('500');
    });

    test('Updating total price when removing one option and product', async () => {
        render(<OrderPage />);

        const total = screen.getByText('Total Price:', { exact: false });
        expect(total).toHaveTextContent('0');

        const insuranceCheckbox = await screen.findByRole('checkbox', {
            name: 'Insurance'
        });

        userEvent.click(insuranceCheckbox);

        const americaInput = await screen.findByRole('spinbutton', {
            name: 'America'
        });

        userEvent.clear(americaInput);
        userEvent.type(americaInput, '3');

        userEvent.clear(americaInput);
        userEvent.type(americaInput, '1');

        expect(total).toHaveTextContent('1500');
    });
});
