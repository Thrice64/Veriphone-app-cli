const yargs = require('yargs/yargs');

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
                        choices: ['(955)241-2633', '(826)417-3066', '(945)241-2633']
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
            if (args.phone === '(826)417-3066') {
                // invoke a function to phone '(826)417-3066'
                console.log(args);
            } else if (args.phone === '(955)241-2633') {
                // invoke a function to phone '(955)241-2633'
                console.log('not (826)417-3066');
            } else {
                console.log(`${args.phone} is not available`);
            }
        }
    )
    .help().argv;
    // help() build a help using he details frm our yargs setup
    // get the argument a a plain javascript object and paseses them to handler (when used)

