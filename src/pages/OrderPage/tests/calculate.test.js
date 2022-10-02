import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';

import Type from '../Type';

test("update product's total when products change", async () => {
    render(<Type orderType="products" />);

    // exact : false 를 옵션을 설정하면 '총 가격:'이라는 텍스트 뒤의 element도 잡아준다.
    const productsTotal = screen.getByText('총 가격:', { exact: false });
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
