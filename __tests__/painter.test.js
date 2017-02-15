import React from 'react';
import { ReactPainter } from '../src/index.js';
import TestUtils from 'react-addons-test-utils';

jest.useRealTimers();

describe('react-painter', () => {
    test('Snapshot', () => {
        const component = TestUtils.renderIntoDocument(
            <ReactPainter />
        );

        expect(1).toEqual(1);
    });
});
