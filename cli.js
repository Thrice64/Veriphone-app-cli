const { string } = require('yargs');
const yargs = require('yargs/yargs');
const app = require('./app');

yargs(process.argv.slice(2))
    // $0  expands the file name
    // <> indicate that the command is mandatory
    // [] indicate that options are optional
    .usage('$0: Usage <command> [options]')
    .command(
        // command
        // <> indicaes the command argument required
        'verify <phone>', 
        // description for the command 
        'verify phone number', 
        // builder function to build out our command argument and options
        // the argument inside the function below represents an instance of yargs
        (yargs) => {
           // configures a command argument based off the name
           // first argument below must match the name fiven in the <>
           // seond agument is an options object
           return ( 
                yargs
                    .positional('phone', {
                        describe: 'phone number to get info on',
                        type: 'string',
                        //choices: ['9552412633', '8264173066', '9452412633']
                    })
                    // options aka flags that exists on our command
                    // first argument is the short or long form for the option name (ex: long form)
                    // alias is  opposite form of the first argument (ex: short form)
                    .options('Countrycode', {
                        alias: 'c',
                        describe:
                            'the country code of phone number',
                        default: 'US'
                    })
            )
        }, 
        // handler function for handling parsed command, command arguments, and options
        (args) => {
            if (typeof args.phone === "string" && /^\d{10}$/.test(args.phone)) {
                // invoke a function to phone '8264173066'
                //console.log(args);
                app.verifyPhone(args);
            } else {
                console.log(`${args.phone} is not a phone number`);
            }
        }
    )
    .command(
        'example',
        'example (dummy) phone nummber for any country/phone-type combination',

        (yargs) => {
            return (
                yargs
                .options('type', {
                    alias: 't',
                    describe:
                        'the type of example number to return',
                    choices: ['fixed_line', 'mobile' , 'premium_rate', 'shared_cost', 'toll_free', 'voip'],
                    default: 'mobile'
                }
                )

                .options('Countrycode', {
                    alias: 'c',
                    describe:
                        'the country code of phone number',
                    default: 'US'
                })

            )
        }
    )
    .help().argv;
    // help() build a help using he details frm our yargs setup
    // get the argument a a plain javascript object and paseses them to handler (when used)

