import path from 'path'

const ProfilerPath = path.join(process.cwd(), 'profiler')

const vars = {
    ProfilerPath,
    ProfilerOutputPath : path.join(ProfilerPath, 'container_data', 'output.json'),
    ProfilerDefSourcePath : path.join(ProfilerPath, 'src', 'App.def.hpp'),
    ProfilerSourcePath : path.join(ProfilerPath, 'src', 'App.hpp'),
}

const log = () => {
    console.log(vars)
}
log()

export { vars }