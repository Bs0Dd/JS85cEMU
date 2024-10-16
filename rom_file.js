// ROM file in Base64 format to use Emulator without server (CORS error when loading BIN).

// Only first 16KB was encoded because 32KB ROM includes two same dumps of 16KB firmware and only one is used

const ROM_file = `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BAMTCAQCGRgGCQUCFQkWBgQCAAAAAAgEAgICBAgCBAgICAQCAAQVDhUEAAAEBB8EBAAAAAAABgQCAAAAHwAAAAAAAAAABgYAEAgEAgEADhEZFRMRDgQGBAQEBA4OERAIBAIfHwgECBARDggMCgkfCAgfAQ8QEBEODAIBDxERDh8QCAQEBAQOEREOEREODhERHhAIBgAGBgAGBgAABgYABgQCCAQCAQIECAAAHwAfAAACBAgQCAQCDhEQCAQABAAPEBYVFQ4OEREfERERDxERDxERDw4RAQEBEQ4HCREREQkHHwEBDwEBHx8BAQ8BAQEOEQEdEREeERERHxEREQ4EBAQEBA4cCAgICAkGEQkFAwUJEQEBAQEBAR8RGxUVERERERETFRkREQ4REREREQ4PEREPAQEBDhERERUJFg8REQ8FCREeAQEOEBAPHwQEBAQEBBEREREREQ4REREREQoEERERFRUbERERCgQKEREREQoEBAQEHxAIBAIBHw4CAgICAg4DAgIOEhIODggICAgIDgAAAAAAABUKHwEHAQEfCRUVFxUVCRwSER8REREfAQEPEREPCQkJCQkfEAwKCgoKHxEfAQEPAQEfBA4VFRUOBB8BAQEBAQEREQoEChEREREZFRMRERURGRUTERERCQUDBQkRHBIREREREREbFRUREREREREfERERDhERERERDh8REREREREeEREeFBIRDxERDwEBAQ4RAQEBEQ4fBAQEBAQEERERHhAQDxUVDgQOFRUPEREPEREPAQEBDxERDxERERMVFRcOERAMEBEOFRUVFRUVHw4REB4QEQ4VFRUVFR8QERERHhAQEB8fHx8fHx+3FeRvtxHib8YVZIAXjQAAxRVogA0KNwq+b1cjAAAOAq8ADIcLhQoDCYGwAAeHBoUFAwSBAwUCBwGDA4L3CVgZAQAAhI0KVyMBAAoCpAC4AAeABgMFBAQGA4cCgwGHAwf3CTQZAgAAAo0KVyMCAAwCpAC4ALIACIQHAwaABYcEBQMHAoMBhwMG9wkMGQMAAASNClcjAwALAqQAuACyALEABgMFgASEAwUCBwGCAwT3CeYYBACNClcjBAALArgAsgCxAAcCBoAFhASGAwUCBgGCAwP3CcIYBQCNClcjBQALAr8ACYAIAgeEBoagAASAAwIChAGGA4P3CZ4YBgCNClcjBgAKAr8AoQAHh6IABYWkAAMDqAABgQOC9wl8GAcAAICNClcjBwADA/cJbBgIAAsB9wlkGAkAAwH3CVwYCgAHAfcJVBgLAPcB9wlMGAwAAAGNClcjCAAXAsAV9BG/AEgA9wk0GA0AA4ACAgGEA4f3CSYYDgAXIPQRAwP3CRoYDwDAFRoSSAD3CQ4YEACNClcjCQA0AsAVMBK/AFAA9wn4FxEAA4ACAgGEA4f3CeoXEgAXIDISAwP3Cd4XEwDAFVYSUAD3CdIXFAD3FXASFG73FX4SEG7AFXCAvwBYAPcJuBcVADcuAAAIAAMD9wmqFxYA9xWQEuxtwBVwgFgA9wmYFxcAjQpXIwoANQLAFagSvwBgAPcJghcYAAMB9wl6FxkAwCWmEgMD9wluFxoAwBXIEmAA9wliFxsA9xXeEqZtwBVygPcV5BKabWgA9wlKFxwA9wlEFx0AwCVwgAMD9wk4Fx4A9xXeEnxtwBVygPcVCBNwbWgA9wkgFx8AjQpXIwsAMgLDFSQTcwD6//cJChcgANcgJBMDA/cJ/hYhAHcABgD3CfQWIgDDFUITcwAAAPcJ5hYjAMMVcIDLFVQTewAAAPcJ1BYkAMsVZhPAFW6AeAACAPcJwhYlAPcVehMEbcAVcIB4AAAA9wmuFiYAjQpXIwwAAgN3ANgAxhVkgL8A9wkSAPcJkhYnAMYlZIAcA/cJhhYoAAOAAgIBhAOH9wl4FikAxiVigAMD9wlsFioAziWQEwMD9wlgFisAzhWWE4cA9wlUFiwAZhHmC+YL5hUCDUMRNwlKAPcJPhYtAAOAAgIBhAOH9wkwFi4AxSVogAMD9wkkFi8AxiVkgAMD9wkYFjAAwRVMFAkI9wkMFjEA9wkGFjIAxiVkgB4D9wn6FTMAFyHkEwMD9wnuFTQAhRHVC84V6hO/AIUA9wncFTUAFyAWFAMD9wnQFTYAwBUiFIAA9wnEFTcAjQpXIw0AEALAFQEAwRUREcIVIiLDFURExBWIiAFgQmCDYMRgAYYDA/cJlhU4AI0KVyMOAAMD9wmIFVYAvwAACt8J1iDAC98J1iDEFf//ARHfCQYhwQvfCQYhASEDA/cJYBVXALMAABD3CRYMjQpXIw8AEwLAFf//AlDfCQYhAiADA/cJPBVYAMIlPwADgPcJMBVZAJcgPwADgfcJJBVaAI0KVyMQACgCwxX//8AVcIDIFaqqvwADQt8JqiADMgMD9wn+FFsAwzVVVd8JqiDDVaqqA4H3CeoUXADDRf9/3wkUIcAV//8DMN8JFCGzAABA3wnmIMALAwP3CcYUXQCNClcjEQADA/cJuBReAMQV/3+xAIQK3wkyIcQV/v+ECt8JFCGECt8J5iCECt8JqiDEJQEAAwP3CYoUXwCxAMQK3wnmIMQK3wkUIcQVAIDECt8JxiDECt8JqiCNClcjEgADA/cJXhRgAMMVqqq/AEMK3wmqIMMlVVUDA/cJRhRhAL8AQwrfCRQhwyWqqgMD9wkyFGIAwxX//78AQwrfCeYgjQpXIxMAEwLAFQEAAAvfCRQhwCX//wMD9wkIFGMAwBUAgAAL3wkyIcAlAIADA/cJ8hNkAI0KVyMUABQCwRUAIK8AQQxBDN8JJCHBJQCAAwP3CdATZQBBDN8J9iBBDMElAQADA/cJvBNmAI0KVyMVABQCwhUEAK8AAgwCDMIlAQADA/cJnhNnAAIM3wn2IAIM3wkkIcIlAIADA/cJhhNoAI0KVyMWAAMD9wl4E2kAwxUAIK8AwwzDDN8JJCHDJQCAAwP3CV4TagDDDN8J9iDDDN8J1iCNClcjFwAaAsQVBACvAIQMhAzEJQEAAwP3CTQTawCEDN8J9iCEDN8J1iDDFQKAgwyDDN8JFCHDJQDgAwP3CRATbACNClcjGAADA/cJAhNtAAAKrwBAC98J1iCxAEALsQBAC98JnCDAJQIAAwP3CeASbgDAFf9/sQBAC98JJCHAJQCAAwP3CcgSbwDAFf//sQBAC98J5iCNClcjGQADA/cJrhJwAMEVAwCvAIEL3wmcIMElAwADA/cJlhJxALEAgQuxAIEL3wmcIMElAQADA/cJfhJyALEAgQvfCdYgsQCBC98JFCHBJf//AwP3CWIScwDBFQCAsQCBC98JuCCNClcjGgASAgIKvwCsAMIN3wnmIMILAwP3CTgSdAC7AMIN3wkUIcIl//8DA/cJJBJ1AI0KVyMbABcCwxVVqr8AqADDAN8JBiHDJapVAwP3CQISdgDDFf8AvwCkAMMA3wnWIMMlAP8DA/cJ6BF3AI0KVyMcABsCxBX//8MV//+/AAN53wnmIMMV/38AEbMApAADeN8JFCHCFaqqxBVVVb8AhHjfCRQhxCX//wMD9wmkEXgAjQpXIx0AKQLBFREjQWDfCZwgwSUiRgMD9wmGEXkAwBXv3ABg3wkUIcAl3rkDA/cJcBF6AMIVAICCYN8J9iDEFREjwRXv3AFhAwP3CVQRewAEC8EVESNEYAMD9wlEEXwAjQpXIx4AAwP3CTYRfQDCFREjwxXv3IPg3wkGIcMl3rkDA/cJHBF+AMMVESOEEAPhAwP3CQwRfwDDFf//whX/f8Lg3wkyIcIlAIADA/cJ8hCAAMQV///E4N8J1iCNClcjHwAYAsEV//8ACgCN3wmcIMGNAwP3CcoQgQDfCdYgwBX/AACN3wlAIcGN3wkUIcEl7/8DA/cJqhCCAI0KVyMgAC8CwJWqAAGQQpDCpaoAAwP3CY4QgwDAFaqqARBCEMIlqqoDA/cJehCEAMAVcIDBFXKAwhV0gDcKtmbIlVUACZJKkvelVQCoZgMD9wlUEIUAyBVVVQkSShL3JVVVkmYDA/cJPhCGAI0KVyMhACYCwBVwgMEVcoDCFXSAEorIlaoAEZSBineSZGaAihGUl6iqAAMC94tWZgMD9wkGEIcAIagSCuAVqqoQFDcSQGYRGJcoqqoDAvcLNGYDA/cJ5A+IAI0KVyMiADQC9xVwgBhm9xVygBRm9xV0gBBmwBVqgMEVbIA3igpm95VVAABmGZZ3lvplGJb3pVUA9mUDAveL7GUDA/cJnA+JADcK5GX3FVVV2mXAFWqAwRVsgBgWNxbMZVkW9yVVVchlAwL3C75lAwP3CW4PigCNClcjIwBLAjeKqmXAFXCAwRVygMIVdICCCreinWUDA/cJSA+LAOKVqgCBCoIKoZiACoIKIpiAijeie2UDA/cJKg+MAIGKYJj3paoAaGUDAveLZmUDA/cJEg+NADcKVmXAFXCAwRVygMIVdIDSC7ciSmUDA/cJ9A6OAOIVqqrRC9ILoRjQC9ILIhjQC9ELYBj3JaqqIGUDAvcLHmUDA/cJyg6PAI0KVyMkAEICN4oGZfcVcID6ZPcVcoD2ZPcVdIDyZMAVaoDBFWyAwhVugNIL6pVVAFIkqZoSJCqaEiQqqgMD9wmGDpAAUCRomvelVQDEZAMC94vCZAMD9wluDpEANwqyZMAVaoDBFWyAwhVugNIL6hVVVVIkqRoSJCoaESRoGvclVVWOZAMC9wuMZAMD9wk4DpIAjQpXIyUAKwI3CnhkwBVwgMEVcoDCFXSA8JWqAAAA8JWqAAEA9yWqqlZkCgIynAEAAABwnAIABQD3JaqqRmQDA/cJ8g2TADcKOGTwFVVVAACwHPz/AgD3JVVVJmQDA/cJ1A2UAI0KVyMmACgCNwoSZPcVcIAEZPcVcoAAZPcVdID8Y8AVaoDBFWyAwhVugPiVqgAAALie/P8CAPelqgDiYwMD9wmQDZUA+BWqqgAAuB78/wIA9yWqqshjAwP3CXYNlgCNClcjJwAgAsAVcIDBFXKAvwAIit8J1iDIi98J1iDJlf8A3wkGIcmL3wkGIQIQ8pWAAAAAoZRXLP//gIADA/cJMg2XAEIgAwP3CSgNmACNClcjKAAXAsEVdIDCFXCAyRU/AMSV/wAK0d8JBiEKoQMD9wkADZkASqIDgPcJ9gyaAImiA4H3CewMmwCNCl
cjKQADA/cJ3gycAMMVcIDLlf8AwBVygAEQ0ZWqAL8AC8wAAN8JqiBLvP//AwP3CbYMnQDLtVUA3wmqIEvYA4H3CaQMngDmFX8Ai8XfCRQhy7X/AN8JFCHAEMgVcoDYFf8AswA4ygAA3wnmIBckcoADA/cJcgyfAOgLAwP3CWgMoACvAAjC3wnWII0KVyMqADUCxBVwgMyVfwCxAIyK3wkyIcwV/gDAFRQhlIrQCeSL5gsWEaEArorfCdYgnKexALSK///fCaogF6kBAAMD9wkWDKEAsQDMit8J5iDUiuAJ9JWAAP//5IrwCbL/9IoAAN8JqiAXrQAAfgADA/cJ6AuiAI0KVyMrAAMD9wnaC6MAwxVwgMQVcoDMFaoAC5W/AEuK3wmqIMulVQADA/cJuAukAL8AS4rfCRQhABELrP//AwP3CaILpQDUlf8AC5m/AEuK3wnmII0KVyMsABUCwBVwgMiVAQAIi98JFCHIpf8AAwP3CXILpgDIFYAACIvfCTIhyKWAAAMD9wlcC6cAjQpXIy0AFgLBFXKAyZUgAK8ASYxJjN8JJCHJpYAAAwP3CTYLqABJjN8J9iBJjMmlAQADA/cJIgupAI0KVyMuABYCwhVygMqVBACvAAqMCozKpQEAAwP3CQALqgAKjN8J9iAKjN8JJCHKpYAAAwP3CegKqwCNClcjLwADA/cJ2gqsAMMVcoDLlSAArwDLjMuM3wkkIculgAADA/cJvAqtAMuM3wn2IMuM3wnWII0KVyMwAB4CxBVygMMVdIDMlQQArwCMjIyMzKUBAAMD9wmKCq4AjIzfCfYgjIzfCdYgy5WCAIuMi4zfCRQhy6XgAAMD9wlmCq8AjQpXIzEAAwP3CVgKsADAFXSACIqvAEiL3wnWILEASIuxAEiL3wmcIMilAgADA/cJMgqxAMiVfwCxAEiL3wkkIcilgAADA/cJGgqyAMiV/wCxAEiL3wnmII0KVyMyAAMD9wkACrMAwRV0gMmVAwCvAImL3wmcIMmlAwADA/cJ5Am0ALEAiYuxAImL3wmcIMmlAQADA/cJzAm1ALEAiYvfCdYgsQCJi98JFCHJpf8AAwP3CbAJtgDJlYAAsQCJi98JuCCNClcjMwADA/cJlgnzAPcL0F/6AncAtAACBwGBA4b3CYAJ9ACHAAIHAYEDh/cJcgn1AIcAAoEBgwOF9wlkCfYAhwADgQIDAYQDh/cJVAn3AIcAA4ECAgGFA4b3CUQJ+ACHAAOBAgIBhQOH9wk0CfkAhwADgQICAYQDh/cJJAn6AIcAAoABgwOE9wkWCfsAhwADgAIDAYUDh/cJBgn8AIcAAoABgwOF9wn4CP0AhwACgAEHA4f3CeoI/gCHAAOAAgIBhAOH9wnaCP8AhwD3FQBAFl/3FWyAEl/3FQIADl/3FXCACl8XjQAAjQpXIzQAAwP3Ca4IAALBEcAVAQAXcAAA341qgN+lBABqgAMD9wmSCAECwCUAAAMD9wmGCAICwSUAAAMD9wl6CAMCjQpXIzUAAwP3CWwIBALBEcAV//8XcAEA341qgN+lCABqgAMD9wlQCAUCwCX//wMD9wlECAYCwSX//wMD9wk4CAcCjQpXIzYAAwP3CSoICALDEcIVAgCXcAIA341qgN+lAABqgAMD9wkOCAkCwiUAAAMD9wkCCAoCwyUEAAMD9wn2BwsCjQpXIzcAAwP3CegHDAJBEcQVAAIXcYAA341qgN+lAQBqgAMD9wnMBw0CxCUBAAMD9wnABw4CxSUAAAMD9wm0Bw8CRRCNClcjOAADA/cJpAcQAsERwBUCABdw/3/fjWqA36UBAGqAAwP3CYgHEQLAJQAAAwP3CXwHEgLBJf7/AwP3CXAHEwKNClcjOQADA/cJYgcUAsMRwhX/D5dwCADfjWqA36UAAGqAAwP3CUYHFQLCJQAAAwP3CToHFgLDJfh/AwP3CS4HFwKNClcjOgADA/cJIAcYAkERxBX/fxdx/3/fjWqA36UBAGqAAwP3CQQHGQLEJf8/AwP3CfgGGgLFJQEAAwP3CewGGwJFEI0KVyM7AAMD9wncBhwCwxHCFf//l3D/f9+NaoDfpQgAaoADA/cJwAYdAsIl//8DA/cJtAYeAsMlAYADA/cJqAYfAo0KVyM8AAMD9wmaBiACwRHAFf7/F3D/f9+NaoDfpQkAaoADA/cJfgYhAsAl//8DA/cJcgYiAsElAgADA/cJZgYjAo0KVyM9AAMD9wlYBiQCwxHCFaqql3ACAN+NaoDfpQkAaoADA/cJPAYlAsIl//8DA/cJMAYmAsMlVFUDA/cJJAYnAo0KVyM+AAMD9wkWBigCQRHEFaqqF3EAQN+NaoDfpQkAaoADA/cJ+gUpAsQlquoDA/cJ7gUqAsUlAIADA/cJ4gUrAkUQjQpXIz8AAwP3CdIFLALBEcAVOI4XcDiO341qgN+lAQBqgAMD9wm2BS0CwCWSMgMD9wmqBS4CwSVALAMD9wmeBS8CjQpXI0AAAwP3CZAFMALBFf//V3ABAN+NaoDfpQgAaoADA/cJdgUxAsEl//8DA/cJagUyAsEl//8DA/cJXgUzAo0KVyNBAAMD9wlQBTQCwxX//9dwAADfjWqA36UEAGqAAwP3CTYFNQLDJQAAAwP3CSoFNgKNClcjQgADA/cJHAU3AkERxRX/f1dxAIDfjWqA36UJAGqAAwP3CQAFOALFJQCAAwP3CfQEOQJFEI0KVyNDAAMD9wnkBDoCwRX//1dw/3/fjWqA36UIAGqAAwP3CcoEOwLBJQGAAwP3Cb4EPAKNClcjRAADA/cJsAQ9AsMV/3/XcP9/341qgN+lAQBqgAMD9wmWBD4CwyUBAAMD9wmKBD8CjQpXI0UAAwP3CXwEQAJBEcUVAgBXcQIA341qgN+lAABqgAMD9wlgBEECxSUEAAMD9wlUBEICRRCNClcjRgADA/cJRARDAsERwBWqqjdwflrfjWqA36UJAGqAAwP3CSgERALAJarqAwP3CRwERQLBJQCAAwP3CRAERgKNClcjRwADA/cJAgRHAsERwBWqqj9wPlrfjWqA36UJAGqAAwP3CeYDSALAJarqAwP3CdoDSQLBJQCAAwP3Cc4DSgKNClcjSAADA/cJwANLAsERwBWqqh9wbIDfjWqA36UJAGqAAwP3CaQDTALAJarqAwP3CZgDTQLBJQCAAwP3CYwDTgKNClcjSQADA/cJfgNPAsERwBWqqsIVAEACcN+NaoDfpQkAaoADA/cJYANQAsAlquoDA/cJVANRAsElAIADA/cJSANSAo0KVyNKAAMD9wk6A1MCwRHAFaqqwxVsgBNw341qgN+lCQBqgAMD9wkcA1QCwCWq6gMD9wkQA1UCwSUAgAMD9wkEA1YCjQpXI0sAAwP3CfYCawLAFQAAwRUEABdyAgDfjWqA36UAAGqAAwP3CdgCbALAJQIAAwP3CcwCbQLBJQAAAwP3CcACbgKNClcjTAADA/cJsgJvAsIV///DFff/l3IDAN+NaoDfpQgAaoADA/cJlAJwAsIl/f8DA/cJiAJxAsMlAAADA/cJfAJyAo0KVyNNAAMD9wluAsUAQRHEFQAAxRUJABdzAgDfjWqA36UAAGqAAwP3CU4CcwLEJQQAAwP3CUICdALFJQEAAwP3CTYCdQJFEI0KVyNOAAMD9wkmAnYCwBX//8EV9/8XcgIA341qgN+lCABqgAMD9wkIAncCwCX8/wMD9wn8AXgCwSX//wMD9wnwAXkCjQpXI08AAwP3CeIBegLCFQAAwxUCAJdy/f/fjWqA36UEAGqAAwP3CcQBewLCJQAAAwP3CbgBfALDJQIAAwP3CawBfQKNClcjUAADA/cJngHRAEERxBX//8UV/v8XcwMA341qgN+lBABqgAMD9wl+AX4CxCUAAAMD9wlyAX8CxSX+/wMD9wlmAYACRRCNClcjUQADA/cJVgGBAsAV///BFf//F3IBAN+NaoDfpQgAaoADA/cJOAGCAsAl//8DA/cJLAGDAsElAAADA/cJIAGEAo0KVyNSAAMD9wkSAYUCwBUAAMEVAAAXcgEA341qgN+lBABqgAMD9wn0AIYCwCUAAAMD9wnoAIcCwSUAAAMD9wncAIgCjQpXI1MAAwP3Cc4AiQLCFf//wxWqqpdyAgDfjWqA36UIAGqAAwP3CbAAigLCJVXVAwP3CaQAiwLDJQAAAwP3CZgAjAKNClcjVAADA/cJigCNAkERxBX//8UV//8Xc///341qgN+lAABqgAMD9wlqAI4CxCUBAAMD9wleAI8CxSUAAAMD9wlSAJACRRCNClcjVQADA/cJQgCRAsAVqyrBFQEAF3Kqqt+NaoDfpQgAaoADA/cJJACSAsAlAIADA/cJGACTAsElAQADA/cJDACUAo0Kxh1WVn8AUFa3HwAAOlb4AfcJqtv3JczMWFYKA8AVPwD3CTzb9wka4vclzMxEVvoCwRXYgMAV//8REHcgJFb8h8EVmIDAFTwAV6RkABiGBH7FFW439wk648QVGQDFFZKAVyGXgBmG9wnY4UCl+QMKf8EVmIDRlf//VyDYgPuHxRV7N/cJDOPFFbg39wm04UCl+gJXIb43+YfFFYg39wny4sAX+AHBF/oB9wkQDM4n/AEEAvYn/gECAAUDliX3CRIMMQDqAcAVKjf3CYQGBIf3CQAMMgD3AcAVKDf3CXIGBIb3Ce4LMwD3AfeV9v8fVveV//8aVsQVZDfCFQoAAwoAlfcJDAcDYIV+ghWDZcEVCwD3CcraxBUDAMAVBgDDDEIMQAwEf/cJONq3ikRVTX73CRDhwKVkAAUDwKVuAPgCdwBW//cJegn3CYQK9wkGC8YVZIDBFdiAwBX//xEQdyACVfyHNwpiVTcKZFX3Cd7a9wnw2vcJAtvFFQUs9wkU4vcJwODBFdoryYv6AxGg/ALB5dsrwQxFHM4r9wn24fcJouDApW4A6APApWQA+AJ5ANQr3ivrK/grTCziLhIsERsXAHJldiAieiI/IGQvbgByZXYgInIiPyBkL24AcmV2ICJrbCI/ZC9uAHJldj8gei9yL2tsAAD3CdQI9wn2CcUVPiz3CY7h9wk64MClbgAFA8ClZAD4AvcJUgr3CTgKdwAu/3ptIGRsZ3I/IGQvbgAA9wko2sUVnzf3CVjhwBWsgcUVACDEFXqAwRUKAAMK9wmO2kxBwwr3CRbYTDH7A9CQSn7BFRAn9wl22sIVrIEACgEKgdIXcgoAUpCXILaB94fCFayBwxXugIGUV3AKAICUQGAzkAUAE5DXIPOA9YfBFbaBwBVuANGV/wADfsAVmIDBFe6A9wl0BsAVmIDBFe6A9wnSBPcJjgn3CQQJxRWTN/cJwODDHYxTwwrD5ayBwyXmBQKGwxXmBQIKwZ3MU4FygXDEEMRlrIHFFbaBQxH3JQkAtFMjA82V/wA3Cr5T91UAQEpT9wm63M2L/IH3NQAHPFP4AvdFAEA0U/cJstj3VQCAKlNAlTqBBBD3CdQEC5AAEfcJYgYToCwC9AEF4YUMRQsFYc2V/wA3CmpT9wl62s2L/IH3NQAH9FL4AvcJcNj3VQCA6FLCFf8AgJDCAAiBQZXADROBF3IKAMIVAP9C0AQQ9wl8BAuQABH3CQoGE6DsA/cJLgk5AHcApP3FEMXlrIEECsKdAlMCc8ULCwNC4QAK9wlMBAuQAAr3CdoFE6DoAop+y5X/AMQQrwAOhw2FDAMLgQoHCQUIg78ABoYFhAQCA4ACBgGCBQT3CdYINQB3AEz9wBf4AcEX+gH3Ca4IgBWBFcAn/AEDAsEn/gEFA/cJsAg2AHcAJv3AFZiA9wkgAwWG9wmcCDcAdwAS/cAVKDf3CQwDBYb3CYgIOAB3AP7895X2/7dS95X//7JSwxVkN8UV2IDCFQUAwJT3CaIDJhDAlPcJmgOBFVdwCgBAYEBtAK4VEI9+NwpAUvcJJNjFFayB91UAUMRR90UAgL5R9wkYUvc1AAe0UfoC90UAUKxR9xX//wRSdwCU/KMAvc7V3pQJLQD3CXzXxRWsgcEVAgD3JQkA4FEBAoEKxB2EUcQKAxHD5beBAgqBcgMLQguE4AMRxAoBEUHhAArCnbpRAnJE4CYKZhEmEeYQzZX/ADcKuFHFFZM39wl43uYVJgqFHQYAhB0EAPdVAEAwUfcJoNpCEdKL+4HCJbaB+4b3NQAHGlH0AvdFAEASUfcJkNY3imdRAArWCwcCwB1uUUBhwOW2gQGAAAo3EFpRVyG2gROGwhUtgUGVV3AKAECVQGAykAUAEpCXIDKB9YfAFZiAwRUtgfcJlAPBFe6AwhUtgcQVbIHAFT8AkZKUlAN+NgoGAMUVtoGEE0ERweW2gfclCQD0UBcDRGDMlf8Awp3rUA0DBQYCC/cJOAKDfgcBQJUHgYN+AwH3CSgCFJBAlfuADJAmAQEMRGDMlf8Awp27UBQDCwYCC8I1AQADA0CVF4GCCvcJ/AGDfggBQJUQgYN+BAH3CewBwGAUkECVCIH3CeABAxDXcAoAQJXzgNSQDJCFE8QdHlDECvcJaNb3JQkAZlAPA/cdblByUPdVAED+T/cJbtn3RQBA9E/3HV5QVlAJATcMUFD3CWDX9wxIUPcdRFBIUPc1AAbUTzMDhB0GAMUdOFBEIQSGwxUtgQQKAgHDFWyBwhXugNKUlyAtgfyHROEOAwQL9wlYAQN/wxVsgcIV7oCTlJcgLYH8h3YRBgDFZbaB9zUAAoRPBAP3ittPBgcDAbeK008CBDeKzU93AMT+9zUAAWZPCAO37QQAzE/3ZbaBxk93ABT+xmUIAMUVqzf3CX7c9wkq28ClbgAEAvcJItV3ACj6wKVkAPQCwRXugMIVLYHAFT8AUpQCfvdthk+GT/dthk+GT8UVtoF3AHz9JhEmEMEVHjf3CTgAgBPBFR439wnEAcIVZDeDFcNlMgDEFQoAgJL3CZYAJpCAlPcJJAKApQQCwKQCAgx/1wuxAIQVhwBmESYR5hCmEMIV+IDEFTIAEpQCf8IV7oDAFQoABQpElBKRBWEEfgQKF3NkAHeRSE83ikVPhRHG5TIA9wlkACWQhSH7h/cJWgDCFSqBgJhBlUBgFyBkAAIFwOVkAAqQwiX4gPSHN4oRT/eV//8MT8ZlMgCCFYMVhBWFFYcAJhDBFf//wJ30TgaA9wkWAAEQAAoXcgoAd5DiToDlAoDAZQoAhwD3i9NOPoHmEKYQN4rJTsCdxE4AnOQyw529TsKc+ICAYBcgZAACBcDlZAACCpdyCgDCnO6At4qfTtetm04yAAEFgpUzkO6AwZ2MTgFggeDCFWQAAYYCC0IgAQWB4HeQdk73pSgAcU4BAiaQ0YYzkO6A161jTjIAywWCFYMV95X2/1VOwZ1RTreKTU5AnPiAhwAGDihCVghSVU1EQwIaFzUzYUYwOTolGAsAShBRXzQhLStaVz4/EUljCSYjB04yIi5IAwENEw87WUFiLDZAH1sMR1M8IGBMFFAbBF4kPV0nClwxKlg3LxJPHikFOBxFFhkdVBVLZhEmEeYQphDCFTeBxBUyABKUAn/CFS2BwBUKAAUKRJQSkQVhBH4EChdzZAB3kfFNN4ruTYURxuUyAPcJZAAlkIUh+4f3CVoAwhVpgYCYQZVAYBcgZAACBcDlZAAKkMIlN4H0hzeKuk33lf//tU3GZTIAghWDFYQVhRWHACYQwRX//8CdnU0GgPcJFgABEAAKF3IKAHeQi02A5QKAwGUKAIcA94t8TT6B5hCmEDeKck3AnW1NAJx6NMOdZk3CnDeBgGAXIGQAAgXA5WQAAgqXcgoAwpwtgbeKSE3XrURNMgABBYKVM5AtgcGdNU0BYIHgwhVkAAGGAgtCIAEFgeB3kB9N96UoABpNAQImkNGGM5AtgdetDE0yAMsFghWDFfeV9v/+TMGd+ky3ivZMQJw3gYcABg4oQlYIUlVNREMCGhc1M2FGMDk6JRgLAEoQUV80IS0rWlc+PxFJYwkmIwdOMiIuSAMBDRMPO1lBYiw2QB9bDEdTPCBgTBRQGwReJD1dJwpcMSpYNy8STx4pBTgcRRYZHVQVS8AVmID3CYj8AYeHAPcJoNHFFcY19wm62MUVtoHEFbuBzZX/ADeKdUs3CthLNwrYS/cJ5NL3NQAHYkv6AkMR04v+gNcgvIH0h8EVkoBAlcBlIAARkFcgl4D5h8UV0zX3CXDYxBUkgsUVtoHNlf8ANwqcSzcKlEv3VQBAIEvmnRxL95UFABZL9wmG1M2L/IH3NQAHCEv4AreVAkv3RQBA/ErCFZiAwxW2gcGUwJRXcAoAQGASkJcgyoD3h9KUlyDUgPyHwBWYgPcJxvsJhmYRxRXeNfcJ/NeFFfcJUAHKATcKFEv3CdLQhwB3d2VkaSBwYXJvbHgAICB3d29kIGRrbABve2lia2Egd3dvZGEAAPclCQDiSgUC9wms0PcJxtCHAPclAEDQSgUC9wmw0PcJntCHAPcJmND3CarQJgrFFVg29wmO184VCQD3CTbWwKVkABEDwKVuAPgCxRVlNvcJctfOFQBA9wka1sClbgDnA8ClZAD4ArcVfkrKAXJldiBiL2M/IGQvbgByZXYgYz8gIGQvbgAAwJ1gSsDlBgDAZQQABIb3nVJK9EmHAMUVzjb3CSDX5hX//4URRBGECvdVAEDaSTcKPkr3CU7RQJP8gfc1AAfISfgCwOUGAMBlBADzhvdFAEC2SbeTDkq3la5JhwAgd3dvZCBkbGdyAACCFSYKJgomFAECjgqOZXYLAgBHfkoA90UAgIRJxRUWN/cJstaAHwAA9wl4zs5lAgDAFQUA9wlwzQN+hwBve2lia2EgAEo4DiEJSjgOIQkOGislTlgCOgoJWg8qJAMBEhQfIiYHNCktUBliS0QfDghSLwBjTTRKFwQpFl0QPFkdQAQEBgcFAgkACQABAAcFAwIJCAQGIGEgeiBpIG0gdSB0ACoqIE1LLTg1cyAqKgAgICB0IGUgcyB0AHd3b2QgdGVrc3RhAHd3b2RpdGUgbXJrAGRvYmF3aXR4IGQvbgBhemltdXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5XnARABEZIBDDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhYqeQBEjoCrCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfBA4rgBEh4BBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwQYK4ARIiAaQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALRW/WgBEK4HOCS0VwFoARGqB9gkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8EIiuAESJgJcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIUGKsARH4F5gUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA97oHMARHgGSAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtXBAHwBEAIAKAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==`

const ROM_int = new Uint8Array(32768); // Making original 32KB ROM file

var romdec = new Uint8Array(base64ToArrayBuffer(ROM_file));

ROM_int.set(romdec);
ROM_int.set(romdec, 16384);

romdec = null;


// RAM init header, starting from 0x(80)4A

var RAM_hed = new Uint8Array(base64ToArrayBuffer("gAwgABAnAwDUCeEAAACZgIAMAABqDJmArCr//wAAVgAIgABAbIACAHCAfwDaAmSAAAAAAAAAAIgAAAAAAAAAAAAAAAAM/8zM"));