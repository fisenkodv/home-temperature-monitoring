import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
   data = [
    {
      name: "Cambodia",
      series: [
        {
          value: 6361,
          name: "2016-09-18T14:28:55.516Z"
        },
        {
          value: 4493,
          name: "2016-09-20T00:48:12.747Z"
        },
        {
          value: 6768,
          name: "2016-09-22T04:23:18.134Z"
        },
        {
          value: 6420,
          name: "2016-09-15T19:59:09.631Z"
        },
        {
          value: 3433,
          name: '2016-09-24T01:32:47.054Z'
        }
      ]
    },
    {
      name: 'Sudan',
      series: [
        {
          value: 6556,
          name: '2016-09-18T14:28:55.516Z'
        },
        {
          value: 3532,
          name: '2016-09-20T00:48:12.747Z'
        },
        {
          value: 5706,
          name: '2016-09-22T04:23:18.134Z'
        },
        {
          value: 3517,
          name: '2016-09-15T19:59:09.631Z'
        },
        {
          value: 2053,
          name: '2016-09-24T01:32:47.054Z'
        }
      ]
    },
    {
      name: 'Bosnia and Herzegovina',
      series: [
        {
          value: 3205,
          name: '2016-09-18T14:28:55.516Z'
        },
        {
          value: 4977,
          name: '2016-09-20T00:48:12.747Z'
        },
        {
          value: 3539,
          name: '2016-09-22T04:23:18.134Z'
        },
        {
          value: 6157,
          name: '2016-09-15T19:59:09.631Z'
        },
        {
          value: 4151,
          name: '2016-09-24T01:32:47.054Z'
        }
      ]
    },
    {
      name: 'Norfolk Island',
      series: [
        {
          value: 3453,
          name: '2016-09-18T14:28:55.516Z'
        },
        {
          value: 3144,
          name: '2016-09-20T00:48:12.747Z'
        },
        {
          value: 2874,
          name: '2016-09-22T04:23:18.134Z'
        },
        {
          value: 5127,
          name: '2016-09-15T19:59:09.631Z'
        },
        {
          value: 6128,
          name: '2016-09-24T01:32:47.054Z'
        }
      ]
    },
    {
      name: 'Dominican Republic',
      series: [
        {
          value: 3456,
          name: '2016-09-18T14:28:55.516Z'
        },
        {
          value: 5292,
          name: '2016-09-20T00:48:12.747Z'
        },
        {
          value: 4485,
          name: '2016-09-22T04:23:18.134Z'
        },
        {
          value: 6374,
          name: '2016-09-15T19:59:09.631Z'
        },
        {
          value: 4354,
          name: '2016-09-24T01:32:47.054Z'
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
