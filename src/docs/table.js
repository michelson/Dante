import styled from 'react-emotion'
import React from 'react'

export const Table = styled('table')`
  width: 100%;
  padding: 0;
  table-layout: auto;
  background-color: transparent;
  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: 5px;
  font-size: 14px;
  font-family: monospace;
  border: 1px solid #d0cece;
  margin-top: 1em;
  margin-bottom: 1em;
  & thead {
    color: #000;
    font-weight: bold;
    background: #f1fbf3;
  }
  & thead th {
    text-align: left;
    font-weight: 400;
    padding: 20px 20px;
    &:nth-child(1) {

    }
    &:nth-child(2) {

    }
    &:nth-child(3) {

    }
    &:nth-child(4) {

    }
  }
  & tbody {
  }
  & tbody td {
    padding: 12px 20px;
    line-height: 2;
    font-weight: 200;
  }
  & tbody > tr {
    display: table-row;
  }`
