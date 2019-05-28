import { expect } from 'chai';
import { describe, it } from 'mocha';

import { BarsRange } from '../../src/model/bars-range';
import { Coordinate } from '../../src/model/coordinate';
import { TimePointIndex, visibleTimedValues } from '../../src/model/time-data';

// TODO: add tests for marks spans

function visibleTimedValuesCase(rangeFrom: number, rangeTo: number, expectedFrom: number, expectedTo: number, times: number[]): void {
	const barsRange = new BarsRange(rangeFrom as TimePointIndex, 3 as TimePointIndex);
	const timedData = times.map((t: number) => {
		return { time: t as TimePointIndex, x: 0 as Coordinate };
	});
	const actual = visibleTimedValues(timedData, barsRange);
	const expected = { from: expectedFrom, to: expectedTo };
	expect(actual).to.be.deep.equal(expected);
}

describe('TimedData', () => {
	it('visibleTimedValues', () => {
		visibleTimedValuesCase(1, 3, 0, 0, []);
		visibleTimedValuesCase(1, 3, 0, 1, [1]);
		visibleTimedValuesCase(1, 3, 0, 2, [1, 2, 5]);
		visibleTimedValuesCase(1, 3, 1, 2, [-1, 2, 5]);
		visibleTimedValuesCase(1, 3, 1, 1, [-1, 5]);
		visibleTimedValuesCase(1, 3, 0, 0, [4, 5]);
		visibleTimedValuesCase(1, 3, 2, 2, [-2, -1]);
	});
});
