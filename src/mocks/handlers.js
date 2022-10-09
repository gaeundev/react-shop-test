import { context, rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:5000/products', (req, res, context) => {
        return res(
            context.json([
                {
                    name: 'America',
                    imagePath: '/images/america.jpeg'
                },
                {
                    name: 'England',
                    imagePath: '/images/england.jpeg'
                }
            ])
        );
    }),
    rest.get('http://localhost:5000/options', (req, res, context) => {
        return res(
            context.json([
                {
                    name: 'Insurance'
                },
                {
                    name: 'Dinner'
                }
            ])
        );
    }),
    rest.post('http://localhost:5000/order', (req, res, context) => {
        let dummyData = [{ orderNumber: 123455676, price: 2000 }];
        return res(context.json(dummyData));
    })
];
